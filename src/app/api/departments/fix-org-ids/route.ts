import { NextRequest, NextResponse } from 'next/server';
import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

/**
 * Admin utility endpoint to fix department organization IDs
 * This helps when departments exist but don't show up due to organization ID mismatch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetOrganizationId } = body;

    if (!targetOrganizationId) {
      return NextResponse.json(
        { error: 'targetOrganizationId is required' },
        { status: 400 }
      );
    }

    console.log('Fixing department organization IDs to:', targetOrganizationId);

    // Get all departments
    const allDepartments = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.DEPARTMENTS,
      [Query.limit(100)]
    );

    console.log(`Found ${allDepartments.total} total departments`);

    if (allDepartments.total === 0) {
      return NextResponse.json({
        success: true,
        message: 'No departments found in database',
        updated: 0,
      });
    }

    // Find departments with wrong organization ID
    const wrongOrgDepts = allDepartments.documents.filter(
      (dept: any) => dept.organizationId !== targetOrganizationId
    );

    console.log(`Found ${wrongOrgDepts.length} departments with incorrect organization ID`);

    if (wrongOrgDepts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All departments already have correct organization ID',
        updated: 0,
        departments: allDepartments.documents.map((d: any) => ({
          name: d.name,
          code: d.code,
          organizationId: d.organizationId,
        })),
      });
    }

    // Update each department
    const updateResults = [];
    for (const dept of wrongOrgDepts) {
      try {
        console.log(`Updating department: ${dept.name} (${dept.$id})`);

        await serverDatabases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.DEPARTMENTS,
          dept.$id,
          {
            organizationId: targetOrganizationId,
            updatedAt: new Date().toISOString(),
          }
        );

        updateResults.push({
          success: true,
          department: dept.name,
          oldOrgId: dept.organizationId,
          newOrgId: targetOrganizationId,
        });

        console.log(`✅ Updated ${dept.name} successfully`);
      } catch (error: any) {
        console.error(`Failed to update ${dept.name}:`, error.message);
        updateResults.push({
          success: false,
          department: dept.name,
          error: error.message,
        });
      }
    }

    const successCount = updateResults.filter((r) => r.success).length;

    return NextResponse.json({
      success: true,
      message: `Updated ${successCount} of ${wrongOrgDepts.length} departments`,
      updated: successCount,
      results: updateResults,
    });
  } catch (error: any) {
    console.error('Error fixing department organization IDs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Get status of department organization IDs
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetOrganizationId = searchParams.get('organizationId');

    if (!targetOrganizationId) {
      return NextResponse.json(
        { error: 'organizationId parameter is required' },
        { status: 400 }
      );
    }

    // Get all departments
    const allDepartments = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.DEPARTMENTS,
      [Query.limit(100)]
    );

    const departments = allDepartments.documents.map((d: any) => ({
      id: d.$id,
      name: d.name,
      code: d.code,
      organizationId: d.organizationId,
      matches: d.organizationId === targetOrganizationId,
    }));

    const matchingCount = departments.filter((d) => d.matches).length;
    const mismatchCount = departments.filter((d) => !d.matches).length;

    return NextResponse.json({
      total: allDepartments.total,
      matching: matchingCount,
      mismatched: mismatchCount,
      targetOrganizationId,
      departments,
    });
  } catch (error: any) {
    console.error('Error getting department status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
