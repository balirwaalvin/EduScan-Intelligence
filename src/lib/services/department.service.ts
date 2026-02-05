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
        console.log('Department service - Filtering by organizationId:', organizationId);
        queries.push(Query.equal('organizationId', organizationId));
      } else {
        console.log('Department service - No organizationId filter, fetching all');
      }
      queries.push(Query.orderDesc('$createdAt'));

      console.log('Department service - Querying database...');
      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.DEPARTMENTS,
        queries
      );

      console.log('Department service - Response:', {
        total: response.total,
        documentsCount: response.documents.length,
        documents: response.documents
      });

      return { success: true, departments: response.documents };
    } catch (error: any) {
      console.error('Department service - Error:', error);
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
        COLLECTIONS.DEPARTMENTS,
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
        COLLECTIONS.DEPARTMENTS,
        'unique()',
        {
          name: departmentData.name,
          code: departmentData.code,
          organizationId: departmentData.organizationId,
          description: departmentData.description || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
      if (updates.code) updateData.code = updates.code;
      if (updates.description !== undefined) updateData.description = updates.description;

      const department = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.DEPARTMENTS,
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
        COLLECTIONS.DEPARTMENTS,
        departmentId
      );

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
