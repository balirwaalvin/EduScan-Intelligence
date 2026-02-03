import { NextRequest, NextResponse } from 'next/server'
import { Client, Account, Query } from 'node-appwrite'
import { serverDatabases, serverUsers } from '@/lib/appwrite-server'
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'

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

    // Check if there's an existing session cookie and try to delete it
    const existingSessionId = request.cookies.get('session')?.value
    if (existingSessionId) {
      try {
        console.log('Found existing session, attempting to delete it')
        const tempClient = new Client()
          .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
          .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
          .setSession(existingSessionId)

        const tempAccount = new Account(tempClient)
        await tempAccount.deleteSession('current')
        console.log('Existing session deleted')
      } catch (sessionError) {
        console.log('Could not delete existing session (may already be invalid)')
      }
    }

    // Create a fresh client for authentication
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

    const account = new Account(client)

    try {
      // Create email password session (this is just for authentication, not stored in DB)
      const session = await account.createEmailPasswordSession(email, password)
      console.log('Session created successfully:', session.$id)

      // Create a NEW client with the session secret for authenticated requests
      const authenticatedClient = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setSession(session.secret)

      const authenticatedAccount = new Account(authenticatedClient)
      const user = await authenticatedAccount.get()
      console.log('User retrieved:', user.$id, user.email)

      // Get additional user info from our Users collection using server API key
      let userRole = 'USER'
      try {
        const userDocs = await serverDatabases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.USERS,
          [Query.equal('email', email)]
        )

        if (userDocs.documents.length > 0) {
          const userDoc = userDocs.documents[0]
          userRole = userDoc.role || 'USER'
          console.log('User role from database:', userRole)
        }
      } catch (dbError) {
        console.error('Could not fetch user from database:', dbError)
        // Continue with default role if database lookup fails
      }

      // Create response with session cookie
      const response = NextResponse.json(
        {
          success: true,
          user: {
            id: user.$id,
            email: user.email,
            name: user.name,
            role: userRole,
            emailVerification: user.emailVerification,
            status: user.status,
          },
          message: 'Login successful'
        },
        { status: 200 }
      )

      // Set the session secret as a cookie (not the session ID)
      // This allows the client to make authenticated requests
      response.cookies.set('session', session.secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response

    } catch (authError: any) {
      console.error('Authentication failed:', authError)
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
