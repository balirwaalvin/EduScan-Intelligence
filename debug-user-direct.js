const { Client, Databases, Query } = require('node-appwrite');

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

async function checkUser(email) {
    console.log(`Checking user: ${email}`);
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal('email', email)]
        );

        if (response.documents.length === 0) {
            console.log('❌ User NOT FOUND in database!');

            console.log('\nListing all users in DB:');
            const allUsers = await databases.listDocuments(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                [Query.limit(5)]
            );
            if (allUsers.documents.length === 0) {
                console.log("Database is empty!");
            }
            allUsers.documents.forEach(u => console.log(` - ${u.email}`));
        } else {
            console.log('✅ User FOUND in database!');
            const user = response.documents[0];
            console.log(` - ID: ${user.$id}`);
            console.log(` - Email: ${user.email}`);
            console.log(` - Role: ${user.role}`);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkUser('admin@edu-scan.app');
