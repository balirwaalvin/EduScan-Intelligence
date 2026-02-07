import { NextRequest, NextResponse } from 'next/server';
import { organizationService } from '@/lib/services/organization.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    // Get specific organization
    if (organizationId) {
      const result = await organizationService.getOrganizationById(organizationId);

      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }

      return NextResponse.json({ organization: result.organization });
    }

    // Get all organizations
    const result = await organizationService.getAllOrganizations();

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ organizations: result.organizations });
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Creating organization with data:', body);

    // Pass the organizationId from the request (if provided)
    const result = await organizationService.createOrganization({
      organizationId: body.organizationId || body.adminId, // Use provided ID or adminId
      ...body,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    console.log('Organization created successfully:', result.organization?.$id);

    return NextResponse.json({ organization: result.organization }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating organization:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, ...updates } = body;

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    console.log('Updating organization:', organizationId, updates);

    const result = await organizationService.updateOrganization(organizationId, updates);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ organization: result.organization });
  } catch (error: any) {
    console.error('Error updating organization:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
    }

    const result = await organizationService.deleteOrganization(organizationId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting organization:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
