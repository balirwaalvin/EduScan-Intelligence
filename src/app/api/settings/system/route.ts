import { NextRequest, NextResponse } from 'next/server'
import { databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    // Get organization settings
    const organization = await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.ORGANIZATIONS,
      organizationId
    )

    return NextResponse.json({
      success: true,
      settings: {
        name: organization.name,
        email: organization.email,
        phone: organization.phone || '',
        address: organization.address || '',
        website: organization.website || '',
      },
    })
  } catch (error: any) {
    console.error('Error fetching system settings:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch system settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, name, email, phone, address, website } = body

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    // Update organization settings
    const updatedOrg = await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.ORGANIZATIONS,
      organizationId,
      {
        name,
        email,
        phone: phone || '',
        address: address || '',
        website: website || '',
        updatedAt: new Date().toISOString(),
      }
    )

    return NextResponse.json({
      success: true,
      message: 'System settings updated successfully',
      organization: updatedOrg,
    })
  } catch (error: any) {
    console.error('Error updating system settings:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update system settings' },
      { status: 500 }
    )
  }
}
