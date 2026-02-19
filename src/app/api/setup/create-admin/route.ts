import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/lib/services/auth.service';
import { databaseService } from '@/lib/services/database.service';

/**
 * POST /api/setup/create-admin
 * Creates the initial admin account
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting Admin Account Creation...');

    // Step 1: Register Admin User
    console.log('📝 Registering admin user...');
    const registerResult = await authService.register({
      email: 'admin@edu-scan.app',
      password: 'admin123',
      name: 'System Administrator'
    });

    if (!registerResult.success) {
      console.error('❌ Registration failed:', registerResult.error);
      return NextResponse.json({
        success: false,
        error: registerResult.error,
        step: 'registration'
      }, { status: 400 });
    }

    const userId = registerResult.user?.$id;
    console.log('✅ Admin user registered!', userId);

    // Step 2: Login to get session
    console.log('🔐 Logging in...');
    const loginResult = await authService.login({
      email: 'admin@edu-scan.app',
      password: 'admin123'
    });

    if (!loginResult.success) {
      console.error('❌ Login failed:', loginResult.error);
      return NextResponse.json({
        success: false,
        error: loginResult.error,
        step: 'login'
      }, { status: 400 });
    }

    console.log('✅ Login successful!');

    // Step 3: Create Admin Organization
    console.log('🏢 Creating admin organization...');
    const orgResult = await databaseService.createOrganization({
      name: 'EduScan Admin',
      email: 'admin@edu-scan.app',
      adminId: userId!,
      plan: 'enterprise',
      allowedMethods: ['qr', 'rfid', 'facial'],
      autoCheckout: false,
      lateThresholdMinutes: 15,
      timezone: 'UTC'
    });

    if (!orgResult.success) {
      console.error('❌ Organization creation failed:', orgResult.error);
      return NextResponse.json({
        success: false,
        error: orgResult.error,
        step: 'organization',
        userId
      }, { status: 400 });
    }

    console.log('✅ Organization created!', orgResult.document?.$id);

    // Success!
    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully!',
      data: {
        user: {
          id: userId,
          email: 'admin@edu-scan.app',
          name: 'System Administrator'
        },
        organization: {
          id: orgResult.document?.$id,
          name: 'EduScan Admin',
          plan: 'enterprise'
        }
      }
    });

  } catch (error: any) {
    console.error('❌ ERROR:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error occurred',
      step: 'unknown'
    }, { status: 500 });
  }
}
