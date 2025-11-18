/**
 * @file packages/ui/src/components/NotificationCenter/NotificationCenter.stories.tsx
 * @purpose Storybook stories for the NotificationCenter component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCenter } from './NotificationCenter';

const meta = {
  title: 'Organisms/NotificationCenter',
  component: NotificationCenter,
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationCenter>;

export default meta;
type Story = StoryObj<typeof meta>;

const notifs = [
  { id: 'n-1', avatarName: 'Jane Doe', content: <span><strong>Jane Doe</strong> mentioned you.</span>, timestamp: '2m', isRead: false },
  { id: 'n-2', avatarName: 'Alex Smith', content: <span><strong>Alex Smith</strong> completed a task.</span>, timestamp: '1h', isRead: true },
];

export const Default: Story = {
  args: {
    notifications: notifs,
    onNotificationClick: (id) => alert(`Clicked ${id}`),
    onClearAll: () => alert('Clear all'),
  },
};

export const Empty: Story = {
  args: {
    notifications: [],
    onNotificationClick: (id) => alert(`Clicked ${id}`),
    onClearAll: () => alert('Clear all'),
  },
};
