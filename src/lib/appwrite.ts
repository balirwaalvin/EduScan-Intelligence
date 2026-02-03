import { Client, Account, Databases, Storage, Functions } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// Export client for advanced usage
export { client };

// Database and Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  ATTENDANCE: process.env.NEXT_PUBLIC_APPWRITE_ATTENDANCE_COLLECTION_ID!,
  ORGANIZATIONS: process.env.NEXT_PUBLIC_APPWRITE_ORGANIZATIONS_COLLECTION_ID!,
  SESSIONS: process.env.NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID!,
  DEVICES: process.env.NEXT_PUBLIC_APPWRITE_DEVICES_COLLECTION_ID!,
  DEPARTMENTS: process.env.NEXT_PUBLIC_APPWRITE_DEPARTMENTS_COLLECTION_ID!,
};

// Storage Bucket IDs
export const BUCKETS = {
  PROFILE_IMAGES: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
  QR_CODES: process.env.NEXT_PUBLIC_APPWRITE_QR_CODES_BUCKET_ID!,
};

// Function IDs
export const FUNCTION_IDS = {
  ATTENDANCE_PROCESSOR: process.env.NEXT_PUBLIC_APPWRITE_ATTENDANCE_FUNCTION_ID,
};
