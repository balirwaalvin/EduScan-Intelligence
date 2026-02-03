import { NextRequest, NextResponse } from 'next/server'
import { Client, Account } from 'node-appwrite'
import { serverUsers } from '@/lib/appwrite-server'

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

    console.log('Attempting login for:', email)

    // Create a temporary client for authentication
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

    const account = new Account(client)

    try {

      // Create email password session
      const session = await account.createEmailPasswordSession(email, password)
      console.log('Session created successfully')

      // Get user details using the session
      const user = await account.get()
      console.log('User retrieved:', user.$id, user.email)

      // Create response with session cookie
      const response = NextResponse.json(
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

      // Set the session as a cookie
      response.cookies.set('session', session.$id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response

    } catch (authError: any) {
      console.error('Authentication failed:', authError.message)
      return NextResponse.json(
        { error: authError.message || 'Invalid email or password' },
        { status: 401 }
      )
    }

  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to login' },
      { status: 500 }
    )
  }
}
