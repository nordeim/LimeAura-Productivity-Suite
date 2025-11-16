/**
 * @file packages/types/src/api/requests.ts
 * @purpose Defines DTOs for API create/update operations.
 * @interface Request contracts
 * @phase 2
 */

import { TaskPriority, TaskStatus } from '../models/task';

// --- Task DTOs ---

export interface CreateTaskDTO {
  project_id: string;
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee_id?: string | null;
  parent_id?: string | null;
  due_date?: string | null;
  tags?: string[];
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee_id?: string | null;
  parent_id?: string | null;
  due_date?: string | null;
  tags?: string[];
  is_blocked?: boolean;
  progress?: number;
}

// --- Project DTOs ---

export interface CreateProjectDTO {
  workspace_id: string;
  name: string;
  identifier: string;
  description?: string | null;
  status?: ProjectStatus;
  start_date?: string | null;
  target_date?: string | null;
}

// --- General Query Params ---

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  status?: string[]; // e.g., ['todo', 'in_progress']
  assignee?: string; // user id
  priority?: string[]; // e.g., ['high', 'critical']
  [key: string]: any; // For custom filters
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}
