/**
 * @file apps/web/src/features/dashboard/widgets/TasksWidget.stories.tsx
 * @purpose Storybook stories for the TasksWidget.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TasksWidget } from './TasksWidget';

const meta = {
  title: 'Features/Dashboard/TasksWidget',
  component: TasksWidget,
  tags: ['autodocs'],
} satisfies Meta<typeof TasksWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
