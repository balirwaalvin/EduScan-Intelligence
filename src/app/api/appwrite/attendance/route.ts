import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/services/database.service';

/**
 * POST /api/appwrite/attendance
 * Create a new attendance record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { userId, organizationId, sessionId, method, status } = body;

    if (!userId || !organizationId || !sessionId || !method || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create attendance record
    const result = await databaseService.createAttendance({
      userId,
      organizationId,
      sessionId,
      checkInTime: new Date().toISOString(),
      method,
      status,
      deviceId: body.deviceId,
      location: body.location,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.document,
    });
  } catch (error: any) {
    console.error('Attendance creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/appwrite/attendance?userId=xxx&organizationId=yyy
 * Get attendance records
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const organizationId = searchParams.get('organizationId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (userId) {
      // Get attendance by user
      const result = await databaseService.getAttendanceByUser(userId);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result.documents,
      });
    } else if (organizationId) {
      // Get attendance by organization
      const result = await databaseService.getAttendanceByOrganization(
        organizationId,
        startDate || undefined,
        endDate || undefined
      );

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result.documents,
      });
    } else {
      return NextResponse.json(
        { error: 'userId or organizationId is required' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Attendance fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/appwrite/attendance
 * Update attendance record (e.g., check-out)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, ...updates } = body;

    if (!documentId) {
      return NextResponse.json(
        { error: 'documentId is required' },
        { status: 400 }
      );
    }

    const result = await databaseService.updateAttendance(documentId, updates);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.document,
    });
  } catch (error: any) {
    console.error('Attendance update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
