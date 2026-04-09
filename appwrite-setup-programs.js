const { Client, Databases, ID } = require('node-appwrite');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function setup() {
  console.log('🚀 Starting Appwrite Programs and Users Schema setup...');

  if (!process.env.APPWRITE_API_KEY || !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || !process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID) {
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
  const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

  let programsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PROGRAMS_COLLECTION_ID;

  try {
    // ---------------------
    // 1. PROGRAMS COLLECTION
    // ---------------------
    if (!programsCollectionId) {
      console.log('📦 Programs collection ID not found in .env.local. Creating collection...');
      programsCollectionId = ID.unique();
      await databases.createCollection(
        databaseId,
        programsCollectionId,
        'Programs',
        [
          // Permissions can be set later or modified in the dashboard, setting permissive for now
        ]
      );
      console.log(`✅ Collection "Programs" created: ${programsCollectionId}`);

      // Update .env.local
      const envPath = path.resolve(process.cwd(), '.env.local');
      let envVars = fs.readFileSync(envPath, 'utf8');
      if (envVars.includes('NEXT_PUBLIC_APPWRITE_PROGRAMS_COLLECTION_ID')) {
        envVars = envVars.replace(/NEXT_PUBLIC_APPWRITE_PROGRAMS_COLLECTION_ID=.*/g, `NEXT_PUBLIC_APPWRITE_PROGRAMS_COLLECTION_ID=${programsCollectionId}`);
      } else {
        envVars += `\nNEXT_PUBLIC_APPWRITE_PROGRAMS_COLLECTION_ID=${programsCollectionId}\n`;
      }
      fs.writeFileSync(envPath, envVars);
      console.log('📄 Updated .env.local with NEXT_PUBLIC_APPWRITE_PROGRAMS_COLLECTION_ID');
    } else {
      console.log(`📦 Using existing "Programs" collection ID: ${programsCollectionId}`);
    }

    // Creating Attributes for Programs
    console.log('⚙️ Creating Programs attributes...');
    const programAttributes = [
      { type: 'string', args: [databaseId, programsCollectionId, 'name', 255, true] },
      { type: 'string', args: [databaseId, programsCollectionId, 'code', 100, true] },
      { type: 'string', args: [databaseId, programsCollectionId, 'departmentId', 50, true] },
      { type: 'string', args: [databaseId, programsCollectionId, 'duration', 50, true] },
      { type: 'string', args: [databaseId, programsCollectionId, 'status', 20, false, 'active'] },
      { type: 'string', args: [databaseId, programsCollectionId, 'organizationId', 50, true] },
    ];

    for (const attr of programAttributes) {
      try {
        await databases.createStringAttribute(...attr.args);
        console.log(`  ➕ Added Programs attribute: ${attr.args[2]}`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`  👍 Programs attribute already exists: ${attr.args[2]}`);
        } else {
          console.error(`  ❌ Failed to create Programs attribute ${attr.args[2]}:`, err.message);
        }
      }
    }

    // Wait a brief moment to ensure attributes are created before proceeding
    await new Promise(resolve => setTimeout(resolve, 2000));

    // ---------------------
    // 2. USERS COLLECTION UPDATES
    // ---------------------
    if (usersCollectionId) {
      console.log('\n⚙️ Updating Users collection attributes...');
      const userAttributes = [
        { type: 'string', args: [databaseId, usersCollectionId, 'programId', 50, false] },
        { type: 'string', args: [databaseId, usersCollectionId, 'departmentId', 50, false] },
        // Array attribute for string array
      ];

      for (const attr of userAttributes) {
        try {
          await databases.createStringAttribute(...attr.args);
          console.log(`  ➕ Added Users attribute: ${attr.args[2]}`);
        } catch (err) {
          if (err.message.includes('already exists')) {
            console.log(`  👍 Users attribute already exists: ${attr.args[2]}`);
          } else {
            console.error(`  ❌ Failed to create Users attribute ${attr.args[2]}:`, err.message);
          }
        }
      }

      // Array attribute for registeredCourses
      try {
        // signature: databaseId, collectionId, key, size, required, default, array
        await databases.createStringAttribute(databaseId, usersCollectionId, 'registeredCourses', 50, false, undefined, true);
        console.log(`  ➕ Added array Users attribute: registeredCourses`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`  👍 Users attribute already exists: registeredCourses`);
        } else {
          console.error(`  ❌ Failed to create Users attribute registeredCourses:`, err.message);
        }
      }
    } else {
      console.error('❌ NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID is not defined, cannot update users schema.');
    }

    console.log('\n🎉 Setup Complete! Attributes might take a few seconds to become fully available.');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setup();