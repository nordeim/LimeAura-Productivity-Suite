/**
 * @file packages/ui/src/components/NotificationItem/NotificationItem.stories.tsx
 * @purpose Storybook stories for the NotificationItem component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationItem } from './NotificationItem';

const meta = {
  title: 'Molecules/NotificationItem',
  component: NotificationItem,
  tags: ['autodocs'],
  argTypes: {
    isRead: { control: 'boolean' },
    content: { control: 'text' },
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {
  args: {
    id: 'n-1',
    avatarName: 'Jane Doe',
    avatarSrc: 'https://i.pravatar.cc/128?u=jane_doe',
    content: <span><strong>Jane Doe</strong> mentioned you in <strong>LIME-1: Dashboard</strong></span>,
    timestamp: '2m ago',
    isRead: false,
    onClick: (id) => alert(`Clicked ${id}`),
  },
};

export const Read: Story = {
  args: {
    id: 'n-2',
    avatarName: 'Alex Smith',
    content: <span><strong>Alex Smith</strong> completed <strong>LIME-2: Auth</strong></span>,
    timestamp: '1h ago',
    isRead: true,
    onClick: (id) => alert(`Clicked ${id}`),
  },
};
