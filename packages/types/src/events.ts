/**
 * @file packages/types/src/events.ts
 * @purpose Defines WebSocket event contracts.
 * @interface Event contracts
 * @phase 2
 */

import { Task } from './models/task';
import { User } from './models/user';

export type WebSocketEvent =
  | 'task.created'
  | 'task.updated'
  | 'task.deleted'
  | 'comment.created'
  | 'presence.updated'
  | 'notification.received';

// --- Task Events ---
export interface TaskCreatedEvent {
  type: 'task.created';
  payload: Task;
}

export interface TaskUpdatedEvent {
  type: 'task.updated';
  payload: {
    id: string;
    changes: Partial<Task>;
    version: number;
  };
}

export interface TaskDeletedEvent {
  type: 'task.deleted';
  payload: {
    id: string;
    project_id: string;
  };
}

// --- Presence Events ---
export interface PresenceUpdatePayload {
  user: Pick<User, 'id' | 'display_name' | 'avatar_url'>;
  status: 'online' | 'offline' | 'idle';
  location: {
    type: 'project' | 'task' | 'dashboard';
    id: string; // ID of the project, task, etc.
  };
  cursor?: { x: number; y: number };
}
export interface PresenceUpdatedEvent {
  type: 'presence.updated';
  payload: PresenceUpdatePayload;
}
