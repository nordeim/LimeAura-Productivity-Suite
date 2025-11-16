/**
 * @file packages/types/src/models/task.ts
 * @purpose Defines types for Task, Comment, Attachment, etc.
 * @interface Task interfaces
 * @phase 2
 */

import { User } from './user';

// Based on database_schema.md, custom types
export type TaskStatus =
  | 'backlog'
  | 'todo'
  | 'in_progress'
  | 'in_review'
  | 'done'
  | 'cancelled';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low' | 'none';

// Based on database_schema.md, table 'tasks'
export interface Task {
  id: string; // uuid
  project_id: string; // uuid
  parent_id?: string | null; // uuid
  identifier: string; // e.g., "PROJ-123"
  title: string;
  description?: string | null; // Rich text / Markdown
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id?: string | null; // uuid
  reporter_id: string; // uuid
  start_date?: string | null; // ISO 8601 timestamp
  due_date?: string | null; // ISO 8601 timestamp
  completed_at?: string | null; // ISO 8601 timestamp
  estimated_hours?: number | null;
  actual_hours?: number | null;
  story_points?: number | null;
  progress: number; // 0-100
  is_blocked: boolean;
  tags: string[];
  attachments_count: number;
  comments_count: number;
  version: number; // For optimistic locking
  is_overdue: boolean; // Computed
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Based on database_schema.md, table 'comments'
export interface Comment {
  id: string; // uuid
  task_id: string; // uuid
  parent_id?: string | null; // uuid
  content: string; // Rich text / Markdown
  author_id: string; // uuid
  author?: User; // Optional: populated for display
  mentioned_users: string[]; // array of user uuids
  reactions: Record<string, string[]>; // e.g., {"👍": ["user-id-1"]}
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

// Based on database_schema.md, table 'attachments'
export type AttachmentType =
  | 'image'
  | 'document'
  | 'video'
  | 'audio'
  | 'archive'
  | 'other';

export interface Attachment {
  id: string; // uuid
  entity_type: 'task' | 'comment' | 'project';
  entity_id: string; // uuid
  file_name: string;
  file_size: number; // in bytes
  file_type: AttachmentType;
  mime_type?: string;
  cdn_url: string;
  thumbnail_url?: string;
  uploaded_by: string; // user uuid
  uploaded_at: string; // ISO 8601 timestamp
}
