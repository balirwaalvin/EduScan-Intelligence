/**
 * TypeScript types for Appwrite models
 */

export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  organizationId: string;
  profileImageId?: string;
  phoneNumber?: string;
  department?: string;
  isActive: boolean;
}

export interface Attendance {
  $id: string;
  $createdAt: string;
  userId: string;
  organizationId: string;
  sessionId: string;
  checkInTime: string;
  checkOutTime?: string;
  method: 'qr' | 'rfid' | 'facial';
  deviceId?: string;
  latitude?: number;
  longitude?: number;
  status: 'present' | 'late' | 'absent' | 'excused';
  notes?: string;
}

export interface Organization {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
  adminId: string;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  trialEndsAt?: string;
  subscriptionStatus?: 'active' | 'cancelled' | 'expired';
  allowedMethods: ('qr' | 'rfid' | 'facial')[];
  autoCheckout: boolean;
  lateThresholdMinutes: number;
  timezone: string;
}

export interface Session {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  organizationId: string;
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  capacity?: number;
  instructorId?: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  qrCodeId?: string;
  requiresLocation: boolean;
  allowedRadius?: number;
}

export interface Device {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  organizationId: string;
  name: string;
  type: 'rfid_reader' | 'qr_scanner' | 'facial_camera';
  deviceId: string;
  location?: string;
  isActive: boolean;
  lastSeen?: string;
  settings?: Record<string, any>;
}

export interface AppwriteFile {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  bucketId: string;
  name: string;
  mimeType: string;
  sizeOriginal: number;
  chunksTotal: number;
  chunksUploaded: number;
}

export interface AppwriteSession {
  $id: string;
  $createdAt: string;
  userId: string;
  expire: string;
  provider: string;
  providerUid: string;
  providerAccessToken: string;
  providerAccessTokenExpiry: string;
  providerRefreshToken: string;
  ip: string;
  osCode: string;
  osName: string;
  osVersion: string;
  clientType: string;
  clientCode: string;
  clientName: string;
  clientVersion: string;
  clientEngine: string;
  clientEngineVersion: string;
  deviceName: string;
  deviceBrand: string;
  deviceModel: string;
  countryCode: string;
  countryName: string;
  current: boolean;
}

export interface AttendanceStats {
  totalPresent: number;
  totalLate: number;
  totalAbsent: number;
  totalExcused: number;
  averageCheckInTime: string;
  checkInMethods: {
    qr: number;
    rfid: number;
    facial: number;
  };
}

export interface OrganizationStats {
  totalUsers: number;
  totalSessions: number;
  totalAttendance: number;
  activeDevices: number;
  averageAttendanceRate: number;
}
