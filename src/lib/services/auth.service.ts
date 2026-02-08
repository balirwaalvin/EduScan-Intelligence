import { account } from '../appwrite';
import { ID } from 'appwrite';

/**
 * Authentication Service using Appwrite
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export const authService = {
  /**
   * Create a new user account
   */
  async register({ email, password, name }: RegisterData) {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Login with email and password
   */
  async login({ email, password }: LoginCredentials) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return { success: true, session };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get current logged-in user
   */
  async getCurrentUser() {
    try {
      const user = await account.get();
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Logout current user
   */
  async logout() {
    try {
      await account.deleteSession('current');
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update user name
   */
  async updateName(name: string) {
    try {
      const user = await account.updateName(name);
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update user password
   */
  async updatePassword(newPassword: string, oldPassword: string) {
    try {
      const user = await account.updatePassword(newPassword, oldPassword);
      return { success: true, user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create email verification
   */
  async createVerification(url: string) {
    try {
      const verification = await account.createVerification(url);
      return { success: true, verification };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Confirm email verification
   */
  async updateVerification(userId: string, secret: string) {
    try {
      const result = await account.updateVerification(userId, secret);
      return { success: true, result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Create password recovery
   */
  async createRecovery(email: string, url: string) {
    try {
      const recovery = await account.createRecovery(email, url);
      return { success: true, recovery };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Complete password recovery
   */
  async updateRecovery(userId: string, secret: string, password: string) {
    try {
      const result = await account.updateRecovery(userId, secret, password);
      return { success: true, result };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
