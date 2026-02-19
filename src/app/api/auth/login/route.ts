import { NextRequest, NextResponse } from 'next/server'
import { serverDatabases, serverUsers } from '@/lib/appwrite-server'
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'
import { Query, Client, Account } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    // Check for API key specifically to avoid hard crashes
    if (!process.env.APPWRITE_API_KEY) {
      console.error('SERVER ERROR: APPWRITE_API_KEY is not defined')
      return NextResponse.json(
        { error: 'Server configuration error: Missing API Key' },
        { status: 500 }
      )
    }

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

    try {
      // Step 1: Find user by email using server API key
      console.log('Looking up user in database...')
      const userDocs = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        [Query.equal('email', email)]
      )

      if (userDocs.documents.length === 0) {
        console.log('User not found in database')
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      const userDoc = userDocs.documents[0]
      console.log('User found:', userDoc.name, 'Role:', userDoc.role)

      // Step 2: Verify password using Appwrite Users API (server-side)
      console.log('Verifying credentials with Appwrite...')

      // Create a temporary client for password interaction
      const tempClient = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

      const tempAccount = new Account(tempClient)

      try {
        // Try to create a session - if this succeeds, credentials are valid
        const session = await tempAccount.createEmailPasswordSession(email, password)
        console.log('✅ Credentials verified!')

        // Immediately delete the session - we don't need it
        try {
          const deleteClient = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
            .setSession(session.secret)
          const deleteAccount = new Account(deleteClient)
          await deleteAccount.deleteSession('current')
          console.log('Temporary session cleaned up')
        } catch (cleanupError) {
          console.log('Session cleanup failed (non-critical):', cleanupError)
        }

      } catch (authError: any) {
        console.log('Invalid credentials:', authError.message)
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Step 3: Create response with user data (no session needed!)
      const response = NextResponse.json(
        {
          success: true,
          user: {
            id: userDoc.$id,
            email: userDoc.email,
            name: userDoc.name,
            role: userDoc.role || 'USER',
            isActive: userDoc.isActive,
          },
          message: 'Login successful'
        },
        { status: 200 }
      )

      // Set a simple auth token (just the user ID for now)
      // In production, you'd use JWT or proper session management
      response.cookies.set('auth_user', JSON.stringify({
        id: userDoc.$id,
        email: userDoc.email,
        role: userDoc.role,
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      console.log('✅ Login successful!')
      return response

    } catch (error: any) {
      console.error('Login error:', error)
      return NextResponse.json(
        { error: error.message || 'Login failed' },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
