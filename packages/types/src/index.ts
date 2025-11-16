/**
 * @file packages/types/src/index.ts
 * @purpose Main entry point for @limeaura/types package.
 * @interface Public API
 * @phase 2
 */

// --- API Contracts ---
export * from './api/requests';
export * from './api/responses';

// --- Models ---
export * from './models/user';
export * from './models/task';
export * from './models/project';

// --- System Contracts ---
export * from './events';
export * from './sync';

// --- UI Contracts ---
// (This file is minimal for now, will be expanded in Phase 4)
export type ComponentVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg';
