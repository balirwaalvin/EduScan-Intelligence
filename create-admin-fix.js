const { Client, Databases, Account } = require('node-appwrite');

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '6980a2c2001d259c7a2a';
const API_KEY = 'standard_9fb48d3e3c5fb3200efe5ac14f79b040b04f9eb0aac84f011dab1e68e3ce64bfab601b919f4cb22dd4e36493ceb06b2f1c449f60570b20b60e90e11b94af5a6824fa0b2e1adb03d5d872a9df0242eb24977659e643d4e2095f054cb0849e57624e6818d995ba5a1d7e817dc3e01f2c7f49f76389cc6efc5da02f9c72b3955726';
const DATABASE_ID = '6980bfd2002a2767d926';
const USERS_COLLECTION_ID = 'users';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function createAdminUser() {
    console.log('--- Creating Admin User ---');

    const email = 'admin@edu-scan.app';
    const password = 'admin123';
    const name = 'System Administrator';

    try {
        console.log('1. Creating user in Database...');
        try {
            const user = await databases.createDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                'unique()',
                {
                    name: name,
                    email: email,
                    role: 'ADMIN',
                    organizationId: 'system',
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );
            console.log('✅ User created in Database:', user.$id);
        } catch (dbError) {
            console.log('Database creation failed (might already exist):', dbError.message);
        }

        console.log('\n2. Creating user in Appwrite Auth...');
        // We need a client WITHOUT the API key to create a user via Client API
        // OR use Users API with API Key (which is easier here)
        const { Users } = require('node-appwrite');
        const users = new Users(client);

        try {
            const authUser = await users.create(
                'unique()', // ID
                email, // Email
                null, // Phone
                password, // Password
                name // Name
            );
            console.log('✅ User created in Auth:', authUser.$id);

            // Verify email automatically for admin
            await users.updateEmailVerification(authUser.$id, true);
            console.log('✅ Email verified');

        } catch (authError) {
            console.log('Auth creation failed (might already exist):', authError.message);

            // If exists, let's update password just in case
            if (authError.message.includes('already exists')) {
                console.log('Updating password for existing user...');
                // We'd need the user ID to update password via server API
                // Skipping for now as we just need existence
            }
        }
    } catch (error) {
        console.error('❌ Critical Error:', error);
    }
}

createAdminUser();
