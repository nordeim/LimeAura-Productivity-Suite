/**
 * @file packages/ui/src/components/GanttChart/GanttChart.stories.tsx
 * @purpose Storybook stories for the GanttChart component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { GanttChart } from './GanttChart';

const meta = {
  title: 'Organisms/GanttChart',
  component: GanttChart,
  tags: ['autodocs'],
} satisfies Meta<typeof GanttChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = new Date();
const tasks = [
  { id: 't-1', name: 'Task 1', start: now, end: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3) },
  { id: 't-2', name: 'Task 2', start: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2), end: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 5) },
];

export const Default: Story = {
  args: {
    tasks: tasks,
  },
};
