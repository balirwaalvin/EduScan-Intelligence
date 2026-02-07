import { databases, DATABASE_ID, COLLECTIONS } from '../appwrite';
import { ID, Query } from 'appwrite';

/**
 * Database Service for Appwrite operations
 */

export interface AttendanceRecord {
  userId: string;
  organizationId: string;
  sessionId: string;
  checkInTime: string;
  checkOutTime?: string;
  method: 'qr' | 'rfid' | 'facial';
  deviceId?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'present' | 'late' | 'absent' | 'excused';
}

export interface Organization {
  name: string;
  type: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  subscriptionStatus?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Session {
  organizationId: string;
  name: string;
  startTime: string;
  endTime: string;
  location?: string;
  capacity?: number;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
}

export const databaseService = {
  /**
   * Create a new attendance record
   */
  async createAttendance(data: AttendanceRecord) {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        ID.unique(),
        data
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get attendance records by user
   */
  async getAttendanceByUser(userId: string, limit = 50) {
    try {
      const documents = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        [
          Query.equal('userId', userId),
          Query.orderDesc('checkInTime'),
          Query.limit(limit),
        ]
      );
      return { success: true, documents: documents.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get attendance records by organization
   */
  async getAttendanceByOrganization(organizationId: string, startDate?: string, endDate?: string) {
    try {
      const queries = [
        Query.equal('organizationId', organizationId),
        Query.orderDesc('checkInTime'),
      ];

      if (startDate) {
        queries.push(Query.greaterThanEqual('checkInTime', startDate));
      }
      if (endDate) {
        queries.push(Query.lessThanEqual('checkInTime', endDate));
      }

      const documents = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        queries
      );
      return { success: true, documents: documents.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update attendance record (e.g., check-out)
   */
  async updateAttendance(documentId: string, data: Partial<AttendanceRecord>) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        documentId,
        data
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create organization
   */
  async createOrganization(data: Organization) {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        ID.unique(),
        data
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get organization by ID
   */
  async getOrganization(organizationId: string) {
    try {
      const document = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update organization
   */
  async updateOrganization(organizationId: string, data: Partial<Organization>) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        data
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create session
   */
  async createSession(data: Session) {
    try {
      const document = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        ID.unique(),
        data
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get sessions by organization
   */
  async getSessionsByOrganization(organizationId: string) {
    try {
      const documents = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        [
          Query.equal('organizationId', organizationId),
          Query.orderDesc('startTime'),
        ]
      );
      return { success: true, documents: documents.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update session
   */
  async updateSession(sessionId: string, data: Partial<Session>) {
    try {
      const document = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        sessionId,
        data
      );
      return { success: true, document };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete session
   */
  async deleteSession(sessionId: string) {
    try {
      await databases.deleteDocument(
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
   * Get attendance statistics
   */
  async getAttendanceStats(organizationId: string, period: 'day' | 'week' | 'month') {
    try {
      const now = new Date();
      let startDate = new Date();

      switch (period) {
        case 'day':
          startDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }

      const documents = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        [
          Query.equal('organizationId', organizationId),
          Query.greaterThanEqual('checkInTime', startDate.toISOString()),
        ]
      );

      return { success: true, documents: documents.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
