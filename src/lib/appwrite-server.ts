import { Client, Databases, Storage, Users, Account } from 'node-appwrite';

/**
 * Server-side Appwrite client for API routes and server actions
 * Uses API key for admin operations
 */

// Initialize Server Client
const serverClient = new Client();

serverClient
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

// Initialize Server Services
export const serverDatabases = new Databases(serverClient);
export const serverStorage = new Storage(serverClient);
export const serverUsers = new Users(serverClient);

// Export client for advanced usage
export { serverClient };

// Helper to create session-based client
export const createSessionClient = (session: string) => {
  const sessionClient = new Client();

  sessionClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setSession(session);

  return {
    account: new Account(sessionClient),
    databases: new Databases(sessionClient),
    storage: new Storage(sessionClient),
  };
};
