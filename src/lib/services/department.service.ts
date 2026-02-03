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
          name: departmentData.name,
          email: `${departmentData.code.toLowerCase()}@department.local`, // Generate email from code
          adminId: departmentData.organizationId, // Use org ID as admin
          plan: 'DEPARTMENT', // Mark as department type
          subscriptionStatus: 'ACTIVE',
          autoCheckout: false,
          lateThresholdMinutes: 15,
          timezone: 'UTC',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          // Custom department fields (can be stored as metadata)
          departmentCode: departmentData.code,
        }
      );

      return { success: true, department };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
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
      const updateData: any = {
        updatedAt: new Date().toISOString(),
      };

      if (updates.name) updateData.name = updates.name;
      if (updates.code) {
        updateData.departmentCode = updates.code;
        updateData.email = `${updates.code.toLowerCase()}@department.local`;
      }

      const department = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        departmentId,
        updateData
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
