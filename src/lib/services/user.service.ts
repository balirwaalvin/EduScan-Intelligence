import { serverDatabases, serverUsers } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

/**
 * Service for managing users in Appwrite
 */

export const userService = {
  /**
   * Get all users with optional filters
   */
  async getAllUsers(organizationId?: string, role?: string) {
    try {
      const queries = [];
      if (organizationId) {
        queries.push(Query.equal('organizationId', organizationId));
      }
      if (role) {
        queries.push(Query.equal('role', role));
      }

      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        queries
      );

      return { success: true, users: response.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    try {
      const user = await serverDatabases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );

      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create a new user
   */
  async createUser(userData: any) {
    try {
      const user = await serverDatabases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        'unique()',
        userData
      );

      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update user
   */
  async updateUser(userId: string, updates: any) {
    try {
      const user = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId,
        updates
      );

      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete user
   */
  async deleteUser(userId: string) {
    try {
      await serverDatabases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      );

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get user statistics
   */
  async getUserStats(organizationId?: string) {
    try {
      const queries = organizationId
        ? [Query.equal('organizationId', organizationId)]
        : [];

      const allUsers = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.USERS,
        queries
      );

      const students = allUsers.documents.filter((u: any) => u.role === 'STUDENT');
      const teachers = allUsers.documents.filter((u: any) => u.role === 'TEACHER');
      const classReps = allUsers.documents.filter((u: any) => u.role === 'CLASS_REP');
      const admins = allUsers.documents.filter((u: any) => u.role === 'ADMIN');

      return {
        success: true,
        stats: {
          total: allUsers.total,
          students: students.length,
          teachers: teachers.length,
          classReps: classReps.length,
          admins: admins.length,
        },
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
