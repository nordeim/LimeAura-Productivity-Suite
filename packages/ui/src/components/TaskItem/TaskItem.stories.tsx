/**
 * @file packages/ui/src/components/TaskItem/TaskItem.stories.tsx
 * @purpose Storybook stories for the TaskItem component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from './TaskItem';
import { Task } from '@limeaura/types';

const meta = {
  title: 'Molecules/TaskItem',
  component: TaskItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTask: Task = {
  id: 't-1',
  project_id: 'p-1',
  identifier: 'LIME-1',
  title: 'Design the new dashboard layout',
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

export const Default: Story = {
  args: {
    task: mockTask,
  },
};
