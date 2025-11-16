/**
 * @file packages/types/src/models/user.ts
 * @purpose Defines types for User, Profile, and Preferences.
 * @interface User interfaces
 * @phase 2
 */

// Based on database_schema.md, table 'users'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'deleted';

export interface User {
  id: string; // uuid
  email: string;
  username?: string;
  full_name: string;
  display_name?: string;
  avatar_url?: string;
  status: UserStatus;
  last_active_at?: string; // ISO 8601 timestamp
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  locale: string; // e.g., 'en', 'es'
  timezone: string; // e.g., 'UTC', 'America/New_York'
  [key: string]: unknown; // For future/flexible settings
}

export interface UserProfile extends User {
  bio?: string;
  location?: string;
  preferences: UserPreferences;
  notification_settings: Record<string, 'in_app' | 'email' | 'push' | 'none'>;
}

// As defined in 'workspace_members' table
export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'guest' | 'viewer';
