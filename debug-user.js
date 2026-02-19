const { Client, Databases, Query } = require('node-appwrite');

// Config
const ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6980a2c2001d259c7a2a';
const API_KEY = process.env.APPWRITE_API_KEY; // Will read from env
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '6980bfd2002a2767d926';
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || 'users';

console.log('--- Appwrite User Debugger ---');
console.log(`Endpoint: ${ENDPOINT}`);
console.log(`Project: ${PROJECT_ID}`);
console.log(`Database: ${DATABASE_ID}`);
console.log(`Collection: ${USERS_COLLECTION_ID}`);
console.log(`API Key set: ${!!API_KEY}`);

if (!API_KEY) {
    console.error('ERROR: APPWRITE_API_KEY is missing!');
    process.exit(1);
}

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function checkUser(email) {
    console.log(`\nChecking for user: ${email}`);
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal('email', email)]
        );

        if (response.documents.length === 0) {
            console.log('❌ User NOT FOUND in database!');
            console.log('This is why login returns "Invalid email or password" (Step 1 failed)');

            console.log('\nListing all users in DB to verify what exists:');
            const allUsers = await databases.listDocuments(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                [Query.limit(5)]
            );
            allUsers.documents.forEach(u => console.log(` - ${u.name} (${u.email})`));
        } else {
            console.log('✅ User FOUND in database:');
            const user = response.documents[0];
            console.log(` - ID: ${user.$id}`);
            console.log(` - Name: ${user.name}`);
            console.log(` - Email: ${user.email}`);
            console.log(` - Role: ${user.role}`);
            console.log(` - Is Active: ${user.isActive}`);
        }
    } catch (error) {
        console.error('❌ Error querying database:', error.message);
    }
}

// Check the admin user
checkUser('admin@edu-scan.app');
