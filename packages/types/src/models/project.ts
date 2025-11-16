/**
 * @file packages/types/src/models/project.ts
 * @purpose Defines types for Organization, Workspace, and Project.
 * @interface Project interfaces
 * @phase 2
 */

// Based on database_schema.md, custom types
export type ProjectStatus =
  | 'planning'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'archived'
  | 'cancelled';

// Based on database_schema.md, table 'projects'
export interface Project {
  id: string; // uuid
  workspace_id: string; // uuid
  identifier: string; // e.g., "PROJ"
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null; // hex
  status: ProjectStatus;
  start_date?: string | null; // ISO 8601 date
  target_date?: string | null; // ISO 8601 date
  owner_id?: string | null; // user uuid
  created_by: string; // user uuid
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Based on database_schema.md, table 'project_members'
export interface ProjectMember {
  project_id: string; // uuid
  user_id: string; // uuid
  role: 'lead' | 'member' | 'viewer';
  added_at: string; // ISO 8601 timestamp
}

// Based on database_schema.md, table 'workspaces'
export interface Workspace {
  id: string; // uuid
  organization_id: string; // uuid
  slug: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null; // hex
  is_private: boolean;
  created_by: string; // user uuid
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Based on database_schema.md, table 'organizations'
export interface Organization {
  id: string; // uuid
  slug: string;
  name: string;
  description?: string | null;
  logo_url?: string | null;
  subscription_plan: 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}
