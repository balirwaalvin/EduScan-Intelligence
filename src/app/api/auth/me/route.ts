import { NextRequest, NextResponse } from 'next/server'

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
      const user = JSON.parse(authCookie.value)

      return NextResponse.json({
        success: true,
        user: {
          $id: user.id, // Map 'id' back to '$id' for compatibility
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerification: true, // Assuming true for now since we logged in
          status: true // Assuming active
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
