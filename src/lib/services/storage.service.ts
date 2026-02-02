import { storage, BUCKETS } from '../appwrite';
import { ID } from 'appwrite';

/**
 * Storage Service for file uploads and management
 */

export const storageService = {
  /**
   * Upload profile image
   */
  async uploadProfileImage(file: File) {
    try {
      const response = await storage.createFile(
        BUCKETS.PROFILE_IMAGES,
        ID.unique(),
        file
      );
      return { success: true, file: response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get file preview URL
   */
  getFilePreview(bucketId: string, fileId: string, width = 400, height = 400) {
    return storage.getFilePreview(bucketId, fileId, width, height);
  },

  /**
   * Get file download URL
   */
  getFileDownload(bucketId: string, fileId: string) {
    return storage.getFileDownload(bucketId, fileId);
  },

  /**
   * Get file view URL
   */
  getFileView(bucketId: string, fileId: string) {
    return storage.getFileView(bucketId, fileId);
  },

  /**
   * Delete file
   */
  async deleteFile(bucketId: string, fileId: string) {
    try {
      await storage.deleteFile(bucketId, fileId);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Upload QR code image
   */
  async uploadQRCode(file: File) {
    try {
      const response = await storage.createFile(
        BUCKETS.QR_CODES,
        ID.unique(),
        file
      );
      return { success: true, file: response };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * List files in bucket
   */
  async listFiles(bucketId: string) {
    try {
      const files = await storage.listFiles(bucketId);
      return { success: true, files: files.files };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get file details
   */
  async getFile(bucketId: string, fileId: string) {
    try {
      const file = await storage.getFile(bucketId, fileId);
      return { success: true, file };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
