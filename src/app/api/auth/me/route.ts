import { NextRequest, NextResponse } from 'next/server'
import { userService } from '@/lib/services/user.service'

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get('auth_user')

    if (!authCookie || !authCookie.value) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    try {
      const cookieUser = JSON.parse(authCookie.value)

      // Fetch fresh user data from database to get latest updates
      const userResult = await userService.getUserById(cookieUser.id)

      if (userResult.success && userResult.user) {
        const freshUser = userResult.user

        return NextResponse.json({
          success: true,
          user: {
            $id: freshUser.$id,
            name: freshUser.name,
            email: freshUser.email,
            phoneNumber: freshUser.phoneNumber, // Include phone number
            role: freshUser.role || cookieUser.role,
            emailVerification: true,
            status: true
          }
        })
      }

      // Fallback to cookie data if database fetch fails
      return NextResponse.json({
        success: true,
        user: {
          $id: cookieUser.id,
          name: cookieUser.name,
          email: cookieUser.email,
          role: cookieUser.role,
          emailVerification: true,
          status: true
        }
      })
    } catch (parseError) {
      console.error('Error parsing auth cookie:', parseError)
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      )
    }

  } catch (error: any) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify authentication' },
      { status: 500 }
    )
  }
}
