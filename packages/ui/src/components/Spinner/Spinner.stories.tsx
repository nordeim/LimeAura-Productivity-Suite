/**
 * @file packages/ui/src/components/Spinner/Spinner.stories.tsx
 * @purpose Storybook stories for the Spinner component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'neutral'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const Neutral: Story = {
  args: {
    size: 'md',
    color: 'neutral',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'primary',
  },
};
