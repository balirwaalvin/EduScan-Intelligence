import { NextRequest, NextResponse } from 'next/server';
import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const departmentId = searchParams.get('departmentId');

    const queries = [];
    if (organizationId) {
      queries.push(Query.equal('organizationId', organizationId));
    }
    if (departmentId) {
      queries.push(Query.equal('departmentId', departmentId));
    }
    queries.push(Query.orderDesc('$createdAt'));

    const response = await serverDatabases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.ORGANIZATIONS,
      queries
    );

    return NextResponse.json({ courses: response.documents });
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const course = await serverDatabases.createDocument(
      DATABASE_ID,
      COLLECTIONS.ORGANIZATIONS,
      'unique()',
      {
        ...body,
        createdAt: new Date().toISOString(),
      }
    );

    return NextResponse.json({ course }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, ...updates } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const course = await serverDatabases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.ORGANIZATIONS,
      courseId,
      updates
    );

    return NextResponse.json({ course });
  } catch (error: any) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    await serverDatabases.deleteDocument(
      DATABASE_ID,
      COLLECTIONS.ORGANIZATIONS,
      courseId
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
