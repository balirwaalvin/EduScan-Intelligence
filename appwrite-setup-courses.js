const { Client, Databases } = require('node-appwrite');
require('dotenv').config({ path: '.env.local' });

async function setup() {
  console.log('🚀 Starting Appwrite Courses schema setup...');

  if (
    !process.env.APPWRITE_API_KEY ||
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ||
    !process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID
  ) {
    console.error('❌ Missing essential Appwrite environment variables in .env.local');
    process.exit(1);
  }

  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const coursesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_COURSES_COLLECTION_ID;

  try {
    console.log('⚙️ Creating Courses attributes...');

    try {
      await databases.createStringAttribute(databaseId, coursesCollectionId, 'programId', 50, false);
      console.log('  ➕ Added Courses attribute: programId');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('  👍 Courses attribute already exists: programId');
      } else {
        console.error('  ❌ Failed to create Courses attribute programId:', err.message);
      }
    }

    console.log('\n🎉 Courses schema setup complete!');
  } catch (error) {
    console.error('❌ Courses schema setup failed:', error);
    process.exit(1);
  }
}

setup();