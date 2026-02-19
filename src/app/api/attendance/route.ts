import { NextRequest, NextResponse } from 'next/server'
import { serverDatabases } from '@/lib/appwrite-server'
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'
import { Query, ID } from 'node-appwrite'

const ATTENDANCE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ATTENDANCE_COLLECTION_ID || 'attendance'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, userId, organizationId, userName, userEmail, userRole, department, studentId } = body

    // Validate required fields
    if (!sessionId || !userId || !organizationId || !userName || !userEmail || !userRole) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure user exists in Users collection
    try {
      await serverDatabases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      )
    } catch (error: any) {
      console.log(`User ${userId} not found, attempting creation...`);
      // If user not found (404), create them
      if (error.code === 404) {
        try {
          await serverDatabases.createDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            userId,
            {
              email: userEmail,
              name: userName,
              role: userRole,
              organizationId,
              department: department || '',
              studentId: studentId || '',
              createdAt: new Date().toISOString(),
              isActive: true,
              phoneNumber: '',
            }
          )
        } catch (createError: any) {
          console.error('Error creating user:', createError.message)
          console.error('Payload:', {
             email: userEmail,
             name: userName,
             role: userRole,
             userId
          })
          // Consider failing if user creation critical, but for now continue
        }
      }
    }

    // Check if attendance already marked
    const existing = await serverDatabases.listDocuments(
      DATABASE_ID,
      ATTENDANCE_COLLECTION_ID,
      [
        Query.equal('sessionId', sessionId),
        Query.equal('userId', userId),
      ]
    )

    if (existing.documents.length > 0) {
      return NextResponse.json(
        { error: 'Attendance already marked for this session' },
        { status: 400 }
      )
    }

    // Get session to check if it's active
    const session = await serverDatabases.getDocument(
      DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID!,
      sessionId
    )

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if session is still active (within time window)
    const now = new Date()
    const startTime = new Date(session.startTime)
    const endTime = new Date(session.endTime)

    // Allow marking attendance from start time to 30 minutes after end time
    const allowedEndTime = new Date(endTime.getTime() + 30 * 60000)

    if (now < startTime) {
      return NextResponse.json(
        { error: 'Session has not started yet' },
        { status: 400 }
      )
    }

    if (now > allowedEndTime) {
      return NextResponse.json(
        { error: 'Session has ended' },
        { status: 400 }
      )
    }

    // Determine status (PRESENT or LATE)
    const lateThreshold = 15 // minutes
    const lateTime = new Date(startTime.getTime() + lateThreshold * 60000)
    const status = now <= lateTime ? 'PRESENT' : 'LATE'

    // Create attendance record
    const fullPayload = {
        sessionId,
        userId,
        organizationId,
        status,
        method: body.method || 'QR_CODE',
        checkInTime: now.toISOString(),
        createdAt: now.toISOString(),
        
        // Use 'userName' and 'userEmail' as explicitly confirmed by user
        userName, 
        userEmail,
        
        studentId: studentId || '',
        department: department || ''
    };

    let attendance;
    try {
        console.log('Attempting to create attendance with FULL payload...');
        attendance = await serverDatabases.createDocument(
          DATABASE_ID,
          ATTENDANCE_COLLECTION_ID,
          ID.unique(),
          fullPayload
        )
    } catch (e: any) {
        console.warn("Full payload failed:", e.message);
        
        // Retry 2: Try with Name/Email but WITHOUT optional fields (studentId, department)
        // This handles cases where studentId/department columns might represent in the schema
        try {
            console.log('Retrying with Name/Email only...');
            attendance = await serverDatabases.createDocument(
                DATABASE_ID,
                ATTENDANCE_COLLECTION_ID,
                ID.unique(),
                {
                    sessionId,
                    userId,
                    organizationId,
                    status,
                    method: body.method || 'QR_CODE',
                    checkInTime: now.toISOString(),
                    createdAt: now.toISOString(),
                    userName,
                    userEmail,
                }
            )
        } catch (e2: any) {
             console.warn("Name/Email payload failed:", e2.message);
             
             // Retry 3: Minimal payload (Last Resort)
             console.log('Retrying with MINIMAL payload...');
             attendance = await serverDatabases.createDocument(
                DATABASE_ID,
                ATTENDANCE_COLLECTION_ID,
                ID.unique(),
                {
                    sessionId,
                    userId,
                    organizationId,
                    status,
                    method: body.method || 'QR_CODE',
                    checkInTime: now.toISOString(),
                    createdAt: now.toISOString(),
                }
            )
        }
    }

    return NextResponse.json({
      success: true,
      attendance,
      status,
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error marking attendance:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to mark attendance' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const userId = searchParams.get('userId')
    const countOnly = searchParams.get('count') === 'true'

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // If userId is provided, check if attendance is already marked
    if (userId) {
      const existing = await serverDatabases.listDocuments(
        DATABASE_ID,
        ATTENDANCE_COLLECTION_ID,
        [
          Query.equal('sessionId', sessionId),
          Query.equal('userId', userId),
        ]
      )

      return NextResponse.json({
        marked: existing.documents.length > 0,
        attendance: existing.documents[0] || null,
      })
    }

    // Get all attendance for a session
    const limit = countOnly ? 0 : 100;
    // Appwrite SDK expects 'number' for limit.
    // Query.limit() requires the limit.
    
    // Note: Appwrite treats limit=0 as pagination metadata fetch?
    // Actually limit=0 returns total but 0 documents.
    // However, Appwrite node SDK requires limit >= 0.

    // Using query builder properly
    const queries = [
        Query.equal('sessionId', sessionId),
        Query.orderDesc('checkInTime')
    ];
    
    if (countOnly) {
       // Just fetch 1 to get total efficiently? Or 0.
       // Let's try 1 to be safe.
       queries.push(Query.limit(1)); 
    } else {
       queries.push(Query.limit(100));
    }

    const attendance = await serverDatabases.listDocuments(
      DATABASE_ID,
      ATTENDANCE_COLLECTION_ID,
      queries
    )

    if (countOnly) {
        return NextResponse.json({
            total: attendance.total
        });
    }

    // Enrich attendance records with user details
    const enrichedAttendance = await Promise.all(
      attendance.documents.map(async (record: any) => {
        // Preferred: Use snapshot data from record if available
        if (record.userName && record.userEmail) {
           return record;
        }

        // Fallback: Fetch user details from Users collection
        try {
          const user = await serverDatabases.getDocument(
            DATABASE_ID,
            COLLECTIONS.USERS,
            record.userId
          )
          return {
            ...record,
            userName: user.name,
            userEmail: user.email,
            department: user.department,
            studentId: user.studentId,
          }
        } catch (e) {
          // If user not found, return record as is (or with placeholders)
          return {
            ...record,
            userName: 'Unknown User',
            userEmail: 'N/A',
          }
        }
      })
    )

    return NextResponse.json({
      attendance: enrichedAttendance,
      total: attendance.total,
    })

  } catch (error: any) {
    console.error('Error fetching attendance:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch attendance' },
      { status: 500 }
    )
  }
}
