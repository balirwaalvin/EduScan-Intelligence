import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query } from 'node-appwrite';

/**
 * Service for managing programs in Appwrite
 */

export const programService = {
  /**
   * Get all programs with optional filters
   */
  async getAllPrograms(organizationId?: string) {
    try {
      const queries = [];
      if (organizationId) {
        console.log('Program service - Filtering by organizationId:', organizationId);
        queries.push(Query.equal('organizationId', organizationId));
      } else {
        console.log('Program service - No organizationId filter, fetching all');
      }
      queries.push(Query.orderDesc('$createdAt'));

      console.log('Program service - Querying database...');
      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        queries
      );

      console.log('Program service - Response:', {
        total: response.total,
        documentsCount: response.documents.length,
        documents: response.documents
      });

      return { success: true, programs: response.documents };
    } catch (error: any) {
      console.error('Program service - Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get program by ID
   */
  async getProgramById(programId: string) {
    try {
      const program = await serverDatabases.getDocument(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        programId
      );

      return { success: true, program };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create a new program
   */
  async createProgram(programData: any) {
    try {
      const program = await serverDatabases.createDocument(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        'unique()',
        {
          name: programData.name,
          code: programData.code,
          organizationId: programData.organizationId,
          departmentId: programData.departmentId || '',
          duration: programData.duration || '',
          status: programData.status || 'active',
        }
      );

      return { success: true, program };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update program
   */
  async updateProgram(programId: string, updates: any) {
    try {
      const updateData: any = {};

      if (updates.name) updateData.name = updates.name;
      if (updates.code) updateData.code = updates.code;
      if (updates.departmentId !== undefined) updateData.departmentId = updates.departmentId;
      if (updates.duration !== undefined) updateData.duration = updates.duration;
      if (updates.status !== undefined) updateData.status = updates.status;

      const program = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        programId,
        updateData
      );

      return { success: true, program };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete program
   */
  async deleteProgram(programId: string) {
    try {
      await serverDatabases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.PROGRAMS,
        programId
      );
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
