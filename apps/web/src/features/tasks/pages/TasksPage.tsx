/**
 * @file apps/web/src/features/tasks/pages/TasksPage.tsx
 * @purpose Page for displaying tasks (Kanban view).
 * @interface Task management UI
 * @phase 7
 */
import React, { useState } from 'react';
import { KanbanBoard } from '@limeaura/ui';
import { useTasks } from '../hooks/useTasks';
import { DropResult } from '@hello-pangea/dnd';
import { Task } from '@limeaura/types';
import styles from './TasksPage.module.css';

// Mock data until useTasks is fully implemented with real data
const mockTasks: Task[] = [
  { id: 't-1', project_id: 'p-1', identifier: 'LIME-1', title: 'Task 1', status: 'todo', priority: 'high', reporter_id: 'u-1', progress: 0, is_blocked: false, tags: [], attachments_count: 0, comments_count: 0, version: 1, is_overdue: false, created_at: '', updated_at: '' },
  { id: 't-2', project_id: 'p-1', identifier: 'LIME-2', title: 'Task 2', status: 'todo', priority: 'medium', reporter_id: 'u-1', progress: 0, is_blocked: false, tags: [], attachments_count: 0, comments_count: 0, version: 1, is_overdue: false, created_at: '', updated_at: '' },
  { id: 't-3', project_id: 'p-1', identifier: 'LIME-3', title: 'Task 3', status: 'in_progress', priority: 'low', reporter_id: 'u-1', progress: 0, is_blocked: false, tags: [], attachments_count: 0, comments_count: 0, version: 1, is_overdue: false, created_at: '', updated_at: '' },
];
const initialColumns = [
  { id: 'todo', title: 'To Do', tasks: mockTasks.filter(t => t.status === 'todo') },
  { id: 'in_progress', title: 'In Progress', tasks: mockTasks.filter(t => t.status === 'in_progress') },
  { id: 'done', title: 'Done', tasks: [] },
];

export const TasksPage: React.FC = () => {
  // const { data: tasks, isLoading } = useTasks();
  // TODO: Replace mock state with useTasks hook
  const [columns, setColumns] = useState(initialColumns);

  const handleTaskMove = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    
    // TODO: Add real update logic via useTasks mutation
    console.log('Move task:', result);

    // Optimistic update
    const sourceCol = columns.find(c => c.id === source.droppableId)!;
    const destCol = columns.find(c => c.id === destination.droppableId)!;
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as Task['status'];
    destCol.tasks.splice(destination.index, 0, movedTask);
    setColumns([...columns]);
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Tasks</h1>
        {/* TODO: Add filters, sorting, etc. */}
      </header>
      <KanbanBoard columns={columns} onTaskMove={handleTaskMove} />
    </div>
  );
};
