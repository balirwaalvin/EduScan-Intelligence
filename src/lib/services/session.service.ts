import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

/**
 * Service for managing sessions in Appwrite
 */

export const sessionService = {
  /**
   * Get all sessions with optional filters
   */
  async getAllSessions(organizationId?: string, isActive?: boolean) {
    try {
      const queries = [];
      if (organizationId) {
        queries.push(Query.equal('organizationId', organizationId));
      }
      if (isActive !== undefined) {
        queries.push(Query.equal('isActive', isActive));
      }
      queries.push(Query.orderDesc('startTime'));
      queries.push(Query.limit(100));

      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        queries
      );

      return { success: true, sessions: response.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get session by ID
   */
  async getSessionById(sessionId: string) {
    try {
      const session = await serverDatabases.getDocument(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        sessionId
      );

      return { success: true, session };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create a new session
   */
  async createSession(sessionData: any) {
    try {
      const now = new Date().toISOString();

      const session = await serverDatabases.createDocument(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        'unique()',
        {
          name: sessionData.name,
          organizationId: sessionData.organizationId,
          startTime: sessionData.startTime,
          endTime: sessionData.endTime,
          location: sessionData.location || '',
          allowedMethods: sessionData.allowedMethods || ['QR_CODE'],
          lateThreshold: sessionData.lateThreshold || 15,
          status: 'SCHEDULED', // Required attribute: SCHEDULED, ACTIVE, ENDED, CANCELLED
          isActive: true,
          createdAt: now,
          updatedAt: now,
        }
      );

      return { success: true, session };
    } catch (error: any) {
      console.error('Error creating session:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update session
   */
  async updateSession(sessionId: string, updates: any) {
    try {
      const session = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        sessionId,
        {
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      );

      return { success: true, session };
    } catch (error: any) {
      console.error('Error updating session:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete session
   */
  async deleteSession(sessionId: string) {
    try {
      await serverDatabases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        sessionId
      );

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get today's active sessions
   */
  async getTodaySessions(organizationId: string) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const queries = [
        Query.equal('organizationId', organizationId),
        Query.greaterThanEqual('startTime', today.toISOString()),
        Query.lessThan('startTime', tomorrow.toISOString()),
        Query.orderDesc('startTime'),
      ];

      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        queries
      );

      return { success: true, sessions: response.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
