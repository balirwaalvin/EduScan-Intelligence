/**
 * Admin Account Creation Script
 * Creates the initial admin user for EduScan
 */

import { authService } from './src/lib/services/auth.service';
import { databaseService } from './src/lib/services/database.service';

async function createAdminAccount() {
  console.log('🚀 Starting Admin Account Creation...\n');

  try {
    // Step 1: Register Admin User
    console.log('📝 Step 1: Registering admin user...');
    const registerResult = await authService.register({
      email: 'admin@edu-scan.app',
      password: 'admin123',
      name: 'System Administrator'
    });

    if (!registerResult.success) {
      console.error('❌ Registration failed:', registerResult.error);
      return;
    }

    console.log('✅ Admin user registered successfully!');
    console.log('   User ID:', registerResult.user?.$id);
    console.log('   Email:', registerResult.user?.email);
    console.log('   Name:', registerResult.user?.name);

    // Step 2: Login with Admin Account
    console.log('\n🔐 Step 2: Testing login...');
    const loginResult = await authService.login({
      email: 'admin@edu-scan.app',
      password: 'admin123'
    });

    if (!loginResult.success) {
      console.error('❌ Login failed:', loginResult.error);
      return;
    }

    console.log('✅ Login successful!');
    console.log('   Session ID:', loginResult.session?.$id);

    // Step 3: Get Current User
    console.log('\n👤 Step 3: Verifying current user...');
    const userResult = await authService.getCurrentUser();

    if (!userResult.success) {
      console.error('❌ Failed to get current user:', userResult.error);
      return;
    }

    console.log('✅ Current user verified!');
    console.log('   User ID:', userResult.user?.$id);
    console.log('   Email:', userResult.user?.email);
    console.log('   Name:', userResult.user?.name);
    console.log('   Email Verified:', userResult.user?.emailVerification);

    // Step 4: Create Admin Organization
    console.log('\n🏢 Step 4: Creating admin organization...');
    const orgResult = await databaseService.createOrganization({
      name: 'EduScan Admin',
      email: 'admin@edu-scan.app',
      adminId: userResult.user!.$id,
      plan: 'enterprise',
      allowedMethods: ['qr', 'rfid', 'facial'],
      autoCheckout: false,
      lateThresholdMinutes: 15,
      timezone: 'UTC'
    });

    if (!orgResult.success) {
      console.error('❌ Organization creation failed:', orgResult.error);
      return;
    }

    console.log('✅ Organization created successfully!');
    console.log('   Organization ID:', orgResult.document?.$id);
    console.log('   Name:', orgResult.document?.name);
    console.log('   Plan:', orgResult.document?.plan);

    // Success Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 ADMIN ACCOUNT SETUP COMPLETE! 🎉');
    console.log('='.repeat(60));
    console.log('\n📋 Account Details:');
    console.log('   Email:        admin@edu-scan.app');
    console.log('   Password:     admin123');
    console.log('   Name:         System Administrator');
    console.log('   User ID:      ' + userResult.user?.$id);
    console.log('   Org ID:       ' + orgResult.document?.$id);
    console.log('   Plan:         Enterprise');
    console.log('\n✅ You can now login to the dashboard!');
    console.log('='.repeat(60) + '\n');

  } catch (error: any) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the script
createAdminAccount()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
