/**
 * @file packages/offline-store/src/store.ts
 * @purpose Dexie (IndexedDB) database definition.
 * @interface Offline persistence
 * @phase 3
 */

import Dexie, { Table } from 'dexie';
import { Task, Project, Comment, SyncOperation } from '@limeaura/types';

export class LimeAuraDB extends Dexie {
  // --- Core Data Tables ---
  public tasks!: Table<Task, string>;
  public projects!: Table<Project, string>;
  public comments!: Table<Comment, string>;

  // --- Sync Queue Table ---
  public syncOperations!: Table<SyncOperation, string>;

  constructor() {
    super('LimeAuraDB');
    this.version(1).stores({
      // Define schema based on types
      // 'id' is the primary key (string, UUID)
      // '&id' means unique index
      // 'project_id' is a normal index
      tasks:
        'id, project_id, status, priority, assignee_id, due_date, version',
      projects: 'id, workspace_id, status, identifier',
      comments: 'id, task_id, author_id',

      // Sync operation queue
      // '++id' auto-incrementing primary key (local only)
      // But we use UUIDs for operations, so 'id' is fine.
      syncOperations: 'id, entity_id, state, created_at',
    });
  }
}

/**
 * Singleton instance of the Dexie database.
 */
export const db = new LimeAuraDB();
