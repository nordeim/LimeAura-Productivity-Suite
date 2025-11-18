/**
 * @file packages/ui/src/components/Card/Card.stories.tsx
 * @purpose Storybook stories for the Card component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'hero', 'compact'] },
    hoverable: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default card.',
    hoverable: true,
  },
};

export const Hero: Story = {
  args: {
    variant: 'hero',
    children: 'This is a hero card.',
    hoverable: true,
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    children: 'This is a compact card.',
    hoverable: true,
  },
};
