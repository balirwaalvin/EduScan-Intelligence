import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Login with Appwrite
    console.log('Attempting login for:', email)
    const loginResult = await authService.login({ email, password })

    if (!loginResult.success) {
      console.error('Login failed:', loginResult.error)
      return NextResponse.json(
        { error: loginResult.error || 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('Login successful, getting user details...')
    // Get user details
    const userResult = await authService.getCurrentUser()

    if (!userResult.success || !userResult.user) {
      console.error('Failed to get user:', userResult.error)
      return NextResponse.json(
        { error: 'Failed to retrieve user information' },
        { status: 500 }
      )
    }

    const user = userResult.user
    console.log('User retrieved:', user.$id, user.email)

    // Return success response with user data
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.$id,
          email: user.email,
          name: user.name,
          emailVerification: user.emailVerification,
          status: user.status,
        },
        message: 'Login successful'
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to login' },
      { status: 500 }
    )
  }
}
