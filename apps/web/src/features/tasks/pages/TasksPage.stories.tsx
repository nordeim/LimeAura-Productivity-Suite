/**
 * @file apps/web/src/features/tasks/pages/TasksPage.stories.tsx
 * @purpose Storybook stories for the TasksPage.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TasksPage } from './TasksPage';

const meta = {
  title: 'Features/Tasks/TasksPage',
  component: TasksPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TasksPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
