/**
 * @file packages/ui/src/components/Avatar/Avatar.stories.tsx
 * @purpose Storybook stories for the Avatar component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/128?u=jane_doe',
    name: 'Jane Doe',
    size: 'lg',
  },
};

export const Fallback: Story = {
  args: {
    name: 'Jane Doe',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    name: 'Alex Smith',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    name: 'Maria Garcia',
    size: 'md',
  },
};

export const XLarge: Story = {
  args: {
    name: 'Kenji Watanabe',
    size: 'xl',
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', paddingLeft: '16px' }}>
      <Avatar name="User One" size="md" style={{ marginLeft: '-16px' }} />
      <Avatar name="User Two" size="md" style={{ marginLeft: '-16px' }} />
      <Avatar name="User Three" size="md" style={{ marginLeft: '-16px' }} />
      <Avatar name="User Four" size="md" style={{ marginLeft: '-16px' }} />
    </div>
  ),
};
