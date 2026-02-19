import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

/**
 * Service for attendance analytics and statistics
 */

export const analyticsService = {
  /**
   * Get attendance statistics for a date range
   */
  async getAttendanceStats(organizationId: string, startDate?: Date, endDate?: Date) {
    try {
      const queries = [Query.equal('organizationId', organizationId)];

      if (startDate) {
        queries.push(Query.greaterThanEqual('markedAt', startDate.toISOString()));
      }
      if (endDate) {
        queries.push(Query.lessThanEqual('markedAt', endDate.toISOString()));
      }

      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        queries
      );

      const records = response.documents;
      const present = records.filter((r: any) => r.status === 'PRESENT').length;
      const absent = records.filter((r: any) => r.status === 'ABSENT').length;
      const late = records.filter((r: any) => r.status === 'LATE').length;

      return {
        success: true,
        stats: {
          total: records.length,
          present,
          absent,
          late,
          averageRate: records.length > 0 ? (present / records.length) * 100 : 0,
        },
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get weekly attendance data
   */
  async getWeeklyAttendance(organizationId: string) {
    try {
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);

      const queries = [
        Query.equal('organizationId', organizationId),
        Query.greaterThanEqual('markedAt', weekAgo.toISOString()),
        Query.lessThanEqual('markedAt', today.toISOString()),
      ];

      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        queries
      );

      // Group by day
      const dayMap = new Map();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      response.documents.forEach((record: any) => {
        const date = new Date(record.markedAt);
        const dayName = days[date.getDay()];
        if (!dayMap.has(dayName)) {
          dayMap.set(dayName, 0);
        }
        if (record.status === 'PRESENT') {
          dayMap.set(dayName, dayMap.get(dayName) + 1);
        }
      });

      const weeklyData = days.map((day) => ({
        day,
        attendance: dayMap.get(day) || 0,
      }));

      return { success: true, data: weeklyData };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get attendance method distribution
   */
  async getMethodDistribution(organizationId: string) {
    try {
      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        [Query.equal('organizationId', organizationId)]
      );

      const methods = {
        'QR Code': 0,
        'RFID': 0,
        'Face ID': 0,
      };

      response.documents.forEach((record: any) => {
        if (record.method === 'QR_CODE') methods['QR Code']++;
        else if (record.method === 'RFID') methods['RFID']++;
        else if (record.method === 'FACIAL_RECOGNITION') methods['Face ID']++;
      });

      const data = Object.entries(methods).map(([method, count]) => ({
        method,
        count,
      }));

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get dashboard summary
   */
  async getDashboardSummary(organizationId: string) {
    try {
      // Get today's date range
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Get today's attendance
      const todayAttendance = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        [
          Query.equal('organizationId', organizationId),
          Query.greaterThanEqual('markedAt', today.toISOString()),
          Query.lessThan('markedAt', tomorrow.toISOString()),
        ]
      );

      // Get active sessions today
      const activeSessions = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.SESSIONS,
        [
          Query.equal('organizationId', organizationId),
          Query.equal('isActive', true),
          Query.greaterThanEqual('startTime', today.toISOString()),
          Query.lessThan('startTime', tomorrow.toISOString()),
        ]
      );

      // Get overall stats
      const allAttendance = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ATTENDANCE,
        [Query.equal('organizationId', organizationId)]
      );

      const present = allAttendance.documents.filter((r: any) => r.status === 'PRESENT').length;
      const averageRate = allAttendance.total > 0 ? (present / allAttendance.total) * 100 : 0;

      return {
        success: true,
        summary: {
          attendanceToday: todayAttendance.total,
          activeSessionsToday: activeSessions.total,
          totalSessions: activeSessions.total,
          averageAttendance: parseFloat(averageRate.toFixed(1)),
        },
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
