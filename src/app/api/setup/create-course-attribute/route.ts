import { NextRequest, NextResponse } from 'next/server'
import { serverDatabases } from '@/lib/appwrite-server'
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'
import { userService } from '@/lib/services/user.service'

function getAuthUserFromCookie(request: NextRequest) {
  const authCookie = request.cookies.get('auth_user')

  if (!authCookie?.value) {
    return null
  }

  try {
    return JSON.parse(authCookie.value)
  } catch {
    return null
  }
}

/**
 * POST /api/setup/create-course-attribute
 * Creates the missing programId attribute in the Courses collection.
 */
export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUserFromCookie(request)

    if (!authUser) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const freshUserResult = await userService.getUserById(authUser.id)

    if (!freshUserResult.success || !freshUserResult.user || freshUserResult.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 })
    }

    if (!process.env.APPWRITE_API_KEY) {
      return NextResponse.json({ error: 'Server API key is not configured' }, { status: 500 })
    }

    try {
      await serverDatabases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.COURSES,
        'programId',
        50,
        false
      )

      return NextResponse.json({
        success: true,
        message: 'programId attribute created successfully in Courses collection',
      })
    } catch (error: any) {
      const message = String(error?.message || '')

      if (message.toLowerCase().includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'programId attribute already exists in Courses collection',
        })
      }

      throw error
    }
  } catch (error: any) {
    console.error('Error creating course attribute:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}