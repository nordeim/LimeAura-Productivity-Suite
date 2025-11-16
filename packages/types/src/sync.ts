/**
 * @file packages/types/src/sync.ts
 * @purpose Defines interfaces for the offline-first sync engine.
 * @interface Offline sync contracts
 * @phase 2
 */

export type SyncOperationType = 'CREATE' | 'UPDATE' | 'DELETE';
export type SyncEntity = 'task' | 'project' | 'comment';
export type SyncState = 'pending' | 'syncing' | 'synced' | 'conflict' | 'failed';

/**
 * An operation from the client that needs to be synced to the server.
 */
export interface SyncOperation {
  id: string; // Local unique ID (e.g., UUIDv4)
  type: SyncOperationType;
  entity: SyncEntity;
  entity_id: string; // The ID of the entity being modified
  data: any; // The payload (e.g., CreateTaskDTO or UpdateTaskDTO)
  state: SyncState;
  retries: number;
  created_at: string; // ISO 8601 timestamp
}

/**
 * Represents a conflict between local and server state.
 */
export interface SyncConflict {
  operation_id: string;
  local_data: any;
  server_data: any;
  server_version: number;
  resolved_data?: any;
}
