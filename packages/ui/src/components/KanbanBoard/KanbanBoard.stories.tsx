/**
 * @file packages/ui/src/components/KanbanBoard/KanbanBoard.stories.tsx
 * @purpose Storybook stories for the KanbanBoard component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import { Task } from '@limeaura/types';
import { useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';

const meta = {
  title: 'Organisms/KanbanBoard',
  component: KanbanBoard,
  tags: ['autodocs'],
} satisfies Meta<typeof KanbanBoard>;

export default meta;

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

const KanbanWithState = (args: any) => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    // Basic dnd logic
    const sourceCol = columns.find(c => c.id === source.droppableId)!;
    const destCol = columns.find(c => c.id === destination.droppableId)!;
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, movedTask);
    setColumns([...columns]);
  };

  return <KanbanBoard {...args} columns={columns} onTaskMove={onDragEnd} />;
};

export const Default: StoryObj<typeof meta> = {
  render: KanbanWithState,
};
