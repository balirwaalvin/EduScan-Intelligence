/**
 * Utility script to fix department organization IDs in Appwrite
 *
 * This script helps when departments exist in Appwrite but don't show up
 * in the UI because of organization ID mismatches.
 *
 * Usage:
 * 1. Update the variables below with your values
 * 2. Run: node fix-department-org-ids.js
 */

const { Client, Databases, Query } = require('node-appwrite');

// Configuration
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6980a2c2001d259c7a2a';
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY; // Server API key
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '6980bfd2002a2767d926';
const DEPARTMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DEPARTMENTS_COLLECTION_ID;

// Your correct organization ID (get from console logs or Appwrite)
const CORRECT_ORGANIZATION_ID = 'YOUR_ORGANIZATION_ID_HERE';

async function fixDepartmentOrganizationIds() {
  console.log('🔧 Department Organization ID Fixer\n');

  // Initialize Appwrite
  const client = new Client();
  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    console.log('📊 Fetching all departments...');

    // Get all departments
    const response = await databases.listDocuments(
      DATABASE_ID,
      DEPARTMENTS_COLLECTION_ID,
      [Query.limit(100)]
    );

    console.log(`✅ Found ${response.total} departments\n`);

    if (response.total === 0) {
      console.log('⚠️  No departments found in database');
      return;
    }

    // Display all departments with their organization IDs
    console.log('📋 Current Department Organization IDs:\n');
    response.documents.forEach((dept, index) => {
      console.log(`${index + 1}. ${dept.name} (${dept.code})`);
      console.log(`   Organization ID: ${dept.organizationId}`);
      console.log(`   Document ID: ${dept.$id}`);
      console.log(`   Match: ${dept.organizationId === CORRECT_ORGANIZATION_ID ? '✅ YES' : '❌ NO'}\n`);
    });

    // Find departments with wrong organization ID
    const wrongOrgDepts = response.documents.filter(
      dept => dept.organizationId !== CORRECT_ORGANIZATION_ID
    );

    if (wrongOrgDepts.length === 0) {
      console.log('✅ All departments have correct organization ID!');
      return;
    }

    console.log(`⚠️  Found ${wrongOrgDepts.length} departments with incorrect organization ID\n`);
    console.log('🔄 Updating departments...\n');

    // Update each department
    for (const dept of wrongOrgDepts) {
      try {
        console.log(`   Updating: ${dept.name}...`);

        await databases.updateDocument(
          DATABASE_ID,
          DEPARTMENTS_COLLECTION_ID,
          dept.$id,
          {
            organizationId: CORRECT_ORGANIZATION_ID,
            updatedAt: new Date().toISOString()
          }
        );

        console.log(`   ✅ Updated successfully\n`);
      } catch (error) {
        console.error(`   ❌ Failed to update: ${error.message}\n`);
      }
    }

    console.log('✅ All departments updated!');
    console.log('\n🎉 Done! Refresh your dashboard to see the departments.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure APPWRITE_API_KEY is set in .env.local');
    console.error('2. Verify DATABASE_ID and DEPARTMENTS_COLLECTION_ID are correct');
    console.error('3. Check API key has proper permissions (documents.read, documents.write)');
  }
}

// Show instructions if variables not set
if (!APPWRITE_API_KEY) {
  console.error('❌ APPWRITE_API_KEY not found!');
  console.error('\nPlease set it in your .env.local file:');
  console.error('APPWRITE_API_KEY="your-api-key-here"');
  process.exit(1);
}

if (CORRECT_ORGANIZATION_ID === 'YOUR_ORGANIZATION_ID_HERE') {
  console.error('❌ Please update CORRECT_ORGANIZATION_ID in this script!');
  console.error('\nTo find your organization ID:');
  console.error('1. Open Admin Dashboard → Departments');
  console.error('2. Open browser console (F12)');
  console.error('3. Look for: "DEBUG: Current user organizationId: [your-id]"');
  console.error('4. Copy that ID and paste it in this script');
  process.exit(1);
}

// Run the script
fixDepartmentOrganizationIds();
