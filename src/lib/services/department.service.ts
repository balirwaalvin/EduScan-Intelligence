import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

/**
 * Service for managing departments in Appwrite
 */

export const departmentService = {
  /**
   * Get all departments with optional filters
   */
  async getAllDepartments(organizationId?: string) {
    try {
      const queries = [];
      if (organizationId) {
        queries.push(Query.equal('organizationId', organizationId));
      }
      queries.push(Query.orderDesc('$createdAt'));

      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        queries
      );

      return { success: true, departments: response.documents };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get department by ID
   */
  async getDepartmentById(departmentId: string) {
    try {
      const department = await serverDatabases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        departmentId
      );

      return { success: true, department };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create a new department
   */
  async createDepartment(departmentData: any) {
    try {
      const department = await serverDatabases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        'unique()',
        {
          ...departmentData,
          createdAt: new Date().toISOString(),
        }
      );

      return { success: true, department };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update department
   */
  async updateDepartment(departmentId: string, updates: any) {
    try {
      const department = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        departmentId,
        updates
      );

      return { success: true, department };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete department
   */
  async deleteDepartment(departmentId: string) {
    try {
      await serverDatabases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        departmentId
      );

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
