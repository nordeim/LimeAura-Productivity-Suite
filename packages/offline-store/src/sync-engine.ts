/**
 * @file packages/offline-store/src/sync-engine.ts
 * @purpose Manages the synchronization of local data with the server.
 * @interface Sync orchestration
 * @phase 3
 */

import { db } from './store';
import { apiClient } from '@limeaura/api-client';
import { SyncOperation, ApiErrorResponse } from '@limeaura/types';

class SyncEngine {
  private isSyncing = false;

  constructor() {
    // Listen for network online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.triggerSync);
    }
  }

  /**
   * Triggers a sync process, ensuring only one runs at a time.
   */
  public triggerSync = async (): Promise<void> => {
    if (this.isSyncing) {
      console.log('SyncEngine: Sync already in progress.');
      return;
    }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.log('SyncEngine: Offline, sync aborted.');
      return;
    }

    this.isSyncing = true;
    console.log('SyncEngine: Starting sync...');

    try {
      const pendingOps = await db.syncOperations
        .where('state')
        .equals('pending')
        .or('state')
        .equals('failed')
        .sortBy('created_at');

      if (pendingOps.length === 0) {
        console.log('SyncEngine: No operations to sync.');
        this.isSyncing = false;
        return;
      }

      console.log(`SyncEngine: Found ${pendingOps.length} pending operations.`);

      for (const op of pendingOps) {
        await this.processOperation(op);
      }
    } catch (error) {
      console.error('SyncEngine: Sync process failed', error);
    } finally {
      this.isSyncing = false;
      console.log('SyncEngine: Sync finished.');
    }
  };

  /**
   * Processes a single sync operation.
   * @param op - The SyncOperation to process.
   */
  private async processOperation(op: SyncOperation): Promise<void> {
    try {
      await db.syncOperations.update(op.id, { state: 'syncing' });
      let response: any;

      // TODO: This needs to map to a real API endpoint, e.g., /api/v1/sync
      // For now, we'll simulate based on type
      const endpoint = `/api/v1/${op.entity}s`; // e.g., /api/v1/tasks

      switch (op.type) {
        case 'CREATE':
          response = await apiClient.post(endpoint, op.data);
          break;
        case 'UPDATE':
          response = await apiClient.patch(
            `${endpoint}/${op.entity_id}`,
            op.data
          );
          break;
        case 'DELETE':
          response = await apiClient.delete(`${endpoint}/${op.entity_id}`);
          break;
      }

      // TODO: Handle response and update local store
      // e.g., update local task with server-provided ID or version

      // Mark as synced
      await db.syncOperations.delete(op.id);
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      const errorCode = apiError.errors?.[0]?.status;

      if (errorCode === 409) {
        // Conflict
        await db.syncOperations.update(op.id, { state: 'conflict' });
        // TODO: Trigger conflict resolution logic
      } else {
        // Other error (network, server, etc.)
        await db.syncOperations.update(op.id, {
          state: 'failed',
          retries: (op.retries || 0) + 1,
        });
      }
    }
  }

  /**
   * Queues a new operation.
   * @param op - The operation data to queue.
   */
  public async queueOperation(
    op: Omit<SyncOperation, 'id' | 'state' | 'retries' | 'created_at'>
  ): Promise<void> {
    const operation: SyncOperation = {
      ...op,
      id: crypto.randomUUID(),
      state: 'pending',
      retries: 0,
      created_at: new Date().toISOString(),
    };
    await db.syncOperations.add(operation);
    
    // Trigger sync immediately if online
    this.triggerSync();
  }
}

/**
 * Singleton instance of the SyncEngine.
 */
export const syncEngine = new SyncEngine();
