/**
 * @file packages/ui/src/index.ts
 * @purpose Main entry point for the @limeaura/ui package. Exports all components.
 * @phase 4, 5 & 6
 */

// --- Phase 4: Atoms ---
export * from './components/Button/Button';
export * from './components/Input/Input';
export * from './components/Avatar/Avatar';
export * from './components/Badge/Badge';
export * from './components/Icon/Icon';
export * from './components/Spinner/Spinner';
export * from './components/Toggle/Toggle';
export * from './components/Tooltip/Tooltip';

// --- Phase 5: Molecules ---
export * from './components/Card/Card';
export * from './components/Modal/Modal';
export * from './components/Dropdown/Dropdown';
export * from './components/ProgressCircular/ProgressCircular';
export * from './components/TaskItem/TaskItem';
export * from './components/NotificationItem/NotificationItem';
export * from './components/SearchInput/SearchInput';
export * from './components/DatePicker/DatePicker';
export * from './components/TagInput/TagInput';
export * from './components/FileUpload/FileUpload';

// --- Phase 6: Organisms ---
export * from './components/KanbanBoard/KanbanBoard';
export * from './components/Calendar/Calendar';
export * from './components/GanttChart/GanttChart';
export * from './components/Dashboard/Dashboard';
export * from './components/TaskForm/TaskForm';
export * from './components/CommentThread/CommentThread';
export * from './components/ProjectSidebar/ProjectSidebar';
export * from './components/NotificationCenter/NotificationCenter';
export * from './components/UserMenu/UserMenu';
export * from './components/CommandPalette/CommandPalette';
