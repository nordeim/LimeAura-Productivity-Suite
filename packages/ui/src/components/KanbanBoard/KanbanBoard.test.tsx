/**
 * @file packages/ui/src/components/KanbanBoard/KanbanBoard.test.tsx
 * @purpose Tests for the KanbanBoard component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { KanbanBoard } from './KanbanBoard';
import { Task } from '@limeaura/types';

// Mock dnd
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Droppable: ({ children }: { children: (provided: any) => React.ReactNode }) => (
    <div>{children({ innerRef: vi.fn(), droppableProps: {} })}</div>
  ),
  Draggable: ({ children }: { children: (provided: any) => React.ReactNode }) => (
    <div>{children({ innerRef: vi.fn(), draggableProps: {}, dragHandleProps: {} })}</div>
  ),
}));

const mockTask: Task = {
  id: 't-1', project_id: 'p-1', identifier: 'LIME-1', title: 'Task 1',
  status: 'todo', priority: 'high', reporter_id: 'u-1', progress: 0,
  is_blocked: false, tags: [], attachments_count: 0, comments_count: 0,
  version: 1, is_overdue: false, created_at: '', updated_at: '',
};

const columns = [
  { id: 'todo', title: 'To Do', tasks: [mockTask] },
  { id: 'done', title: 'Done', tasks: [] },
];

describe('KanbanBoard', () => {
  it('renders columns and tasks', () => {
    render(<KanbanBoard columns={columns} onTaskMove={() => {}} />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument(); // Task count
  });
});
