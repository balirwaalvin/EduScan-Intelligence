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
      // Generate a unique organization ID
      const organizationId = ID.unique();

      const organization = await serverDatabases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        {
          name: organizationData.name,
          email: organizationData.email || '',
          adminId: organizationData.adminId,
          plan: organizationData.plan || 'FREE',
          subscriptionStatus: organizationData.subscriptionStatus || 'ACTIVE',
          allowedMethods: JSON.stringify(organizationData.allowedMethods || ['QR_CODE', 'NFC', 'BLUETOOTH']),
          autoCheckout: organizationData.autoCheckout || false,
          lateThresholdMinutes: organizationData.lateThresholdMinutes || 15,
          timezone: organizationData.timezone || 'UTC',
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

      // Only update fields that exist in Appwrite Organizations schema
      if (updates.name) updateData.name = updates.name;
      if (updates.email) updateData.email = updates.email;
      // Note: address, phone, website not in current schema - need to add to Appwrite
      if (updates.plan) updateData.plan = updates.plan;
      if (updates.subscriptionStatus) updateData.subscriptionStatus = updates.subscriptionStatus;
      if (updates.allowedMethods) updateData.allowedMethods = JSON.stringify(updates.allowedMethods);
      if (updates.autoCheckout !== undefined) updateData.autoCheckout = updates.autoCheckout;
      if (updates.lateThresholdMinutes) updateData.lateThresholdMinutes = updates.lateThresholdMinutes;
      if (updates.timezone) updateData.timezone = updates.timezone;
      if (updates.trialEndsAt) updateData.trialEndsAt = updates.trialEndsAt;

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
