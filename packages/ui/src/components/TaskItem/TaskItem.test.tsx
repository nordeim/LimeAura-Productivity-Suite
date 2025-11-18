/**
 * @file packages/ui/src/components/TaskItem/TaskItem.test.tsx
 * @purpose Tests for the TaskItem component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import { Task } from '@limeaura/types';

const mockTask: Task = {
  id: 't-1',
  project_id: 'p-1',
  identifier: 'LIME-1',
  title: 'Test this component',
  status: 'in_progress',
  priority: 'high',
  assignee_id: 'u-1',
  reporter_id: 'u-2',
  progress: 50,
  is_blocked: false,
  tags: [],
  attachments_count: 0,
  comments_count: 0,
  version: 1,
  is_overdue: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  due_date: '2025-12-31',
};

describe('TaskItem', () => {
  it('renders task details correctly', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('LIME-1')).toBeInTheDocument();
    expect(screen.getByText('Test this component')).toBeInTheDocument();
    expect(screen.getByText('in_progress')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('2025-12-31')).toBeInTheDocument();
  });
});
