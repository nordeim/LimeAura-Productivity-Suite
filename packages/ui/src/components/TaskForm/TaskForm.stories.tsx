/**
 * @file packages/ui/src/components/TaskForm/TaskForm.stories.tsx
 * @purpose Storybook stories for the TaskForm component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TaskForm } from './TaskForm';

const meta = {
  title: 'Organisms/TaskForm',
  component: TaskForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
