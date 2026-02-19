import { serverDatabases } from '@/lib/appwrite-server';
import { DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { Query, ID } from 'node-appwrite';

/**
 * Service for managing organizations in Appwrite
 */

export const organizationService = {
  /**
   * Get organization by ID
   */
  async getOrganizationById(organizationId: string) {
    try {
      const organization = await serverDatabases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId
      );

      return { success: true, organization };
    } catch (error: any) {
      console.error('Error fetching organization:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get all organizations
   */
  async getAllOrganizations() {
    try {
      const response = await serverDatabases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        [Query.orderDesc('$createdAt')]
      );

      return { success: true, organizations: response.documents };
    } catch (error: any) {
      console.error('Error fetching organizations:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Create a new organization
   */
  async createOrganization(organizationData: any) {
    try {
      // Use provided organizationId (adminId) or generate a unique one
      const organizationId = organizationData.organizationId || organizationData.adminId || ID.unique();

      console.log('Creating organization with ID:', organizationId);

      const organization = await serverDatabases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        {
          name: organizationData.name,
          email: organizationData.email || '',
          adminId: organizationData.adminId,
          plan: organizationData.plan || 'FREE',
          // Only include fields that exist in current Appwrite schema
          address: organizationData.address || '',
          phone: organizationData.phone || '',
          website: organizationData.website || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );

      return { success: true, organization };
    } catch (error: any) {
      console.error('Error creating organization:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update organization
   */
  async updateOrganization(organizationId: string, updates: any) {
    try {
      const updateData: any = {
        updatedAt: new Date().toISOString(),
      };

      // Only update fields that currently exist in Appwrite Organizations schema
      if (updates.name) updateData.name = updates.name;
      if (updates.email) updateData.email = updates.email;
      if (updates.plan) updateData.plan = updates.plan;

      // Contact fields (added to schema)
      if (updates.address !== undefined) updateData.address = updates.address;
      if (updates.phone !== undefined) updateData.phone = updates.phone;
      if (updates.website !== undefined) updateData.website = updates.website;


      console.log('Updating organization with data:', updateData);

      const organization = await serverDatabases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        updateData
      );

      return { success: true, organization };
    } catch (error: any) {
      console.error('Error updating organization:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete organization
   */
  async deleteOrganization(organizationId: string) {
    try {
      await serverDatabases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId
      );

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting organization:', error);
      return { success: false, error: error.message };
    }
  },
};
