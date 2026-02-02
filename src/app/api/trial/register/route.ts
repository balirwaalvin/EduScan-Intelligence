import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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
    const existingOrg = await prisma.organization.findUnique({
      where: { email },
    })

    if (existingOrg) {
      return NextResponse.json(
        { error: 'Organization with this email already exists' },
        { status: 409 }
      )
    }

    // Check if admin email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (existingUser) {
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

    // Create organization and admin user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create organization
      const organization = await tx.organization.create({
        data: {
          name: organizationName,
          type: organizationType,
          email,
          phone: phone || null,
          address: address || null,
          subscriptionStatus: 'TRIAL',
          trialStartDate: new Date(),
          trialEndDate,
        },
      })

      // Create admin user
      const admin = await tx.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          firstName: adminFirstName,
          lastName: adminLastName,
          role: 'ADMIN',
          organizationId: organization.id,
          isActive: true,
        },
      })

      return { organization, admin, password: adminPassword }
    })

    // TODO: Send email with credentials
    // In a real application, you would integrate with an email service like SendGrid, AWS SES, etc.
    console.log('Admin Credentials:', {
      email: adminEmail,
      password: result.password,
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
