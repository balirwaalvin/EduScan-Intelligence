import { NextRequest, NextResponse } from 'next/server'
import { databases, DATABASE_ID, ORGANIZATIONS_COLLECTION_ID, USERS_COLLECTION_ID } from '@/lib/appwrite'
import { ID, Query } from 'node-appwrite'
import { hashPassword, generateRandomPassword } from '@/lib/auth'
import { addDays } from 'date-fns'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      organizationName,
      organizationType,
      email,
      phone,
      address,
      adminFirstName,
      adminLastName,
      adminEmail,
    } = body

    // Validate required fields
    if (
      !organizationName ||
      !organizationType ||
      !email ||
      !adminFirstName ||
      !adminLastName ||
      !adminEmail
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if organization email already exists
    const existingOrgs = await databases.listDocuments(
      DATABASE_ID,
      ORGANIZATIONS_COLLECTION_ID,
      [Query.equal('email', email)]
    )

    if (existingOrgs.documents.length > 0) {
      return NextResponse.json(
        { error: 'Organization with this email already exists' },
        { status: 409 }
      )
    }

    // Check if admin email already exists
    const existingUsers = await databases.listDocuments(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      [Query.equal('email', adminEmail)]
    )

    if (existingUsers.documents.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Generate random password for admin
    const adminPassword = generateRandomPassword()
    const hashedPassword = await hashPassword(adminPassword)

    // Calculate trial end date (24 days from now)
    const trialEndDate = addDays(new Date(), 24)

    // Create organization
    const organization = await databases.createDocument(
      DATABASE_ID,
      ORGANIZATIONS_COLLECTION_ID,
      ID.unique(),
      {
        name: organizationName,
        type: organizationType,
        email,
        phone: phone || '',
        address: address || '',
        website: '',
        subscriptionStatus: 'TRIAL',
        trialStartDate: new Date().toISOString(),
        trialEndDate: trialEndDate.toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    )

    // Create admin user
    const admin = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      ID.unique(),
      {
        email: adminEmail,
        password: hashedPassword,
        name: `${adminFirstName} ${adminLastName}`,
        role: 'ADMIN',
        organizationId: organization.$id,
        department: '',
        phone: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    )

    // TODO: Send email with credentials
    // In a real application, you would integrate with an email service like SendGrid, AWS SES, etc.
    console.log('Admin Credentials:', {
      email: adminEmail,
      password: adminPassword,
      trialEndDate: trialEndDate.toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Trial account created successfully',
        trialEndDate: trialEndDate.toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Trial registration error:', error)
    return NextResponse.json(
      { error: 'Failed to create trial account' },
      { status: 500 }
    )
  }
}
