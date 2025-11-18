/**
 * @file packages/ui/src/components/Badge/Badge.stories.tsx
 * @purpose Storybook stories for the Badge component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'In Review',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Done',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'At Risk',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Blocked',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Backlog',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Badge',
  },
};
