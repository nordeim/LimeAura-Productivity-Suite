/**
 * @file packages/ui/src/components/CommentThread/CommentThread.stories.tsx
 * @purpose Storybook stories for the CommentThread component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { CommentThread } from './CommentThread';
import { Comment } from '@limeaura/types';

const meta = {
  title: 'Organisms/CommentThread',
  component: CommentThread,
  tags: ['autodocs'],
} satisfies Meta<typeof CommentThread>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockComments: Comment[] = [
  {
    id: 'c-1',
    task_id: 't-1',
    author_id: 'u-1',
    author: { id: 'u-1', email: 'a@b.c', full_name: 'Jane Doe', avatar_url: 'https://i.pravatar.cc/128?u=jane_doe', status: 'active', created_at: '', updated_at: '' },
    content: 'This is the first comment. We should review the design.',
    created_at: '2025-11-18T10:00:00Z',
    updated_at: '2025-11-18T10:00:00Z',
    mentioned_users: [],
    reactions: {}
  },
  {
    id: 'c-2',
    task_id: 't-1',
    author_id: 'u-2',
    author: { id: 'u-2', email: 'c@d.e', full_name: 'Alex Smith', avatar_url: 'https://i.pravatar.cc/128?u=alex_smith', status: 'active', created_at: '', updated_at: '' },
    content: 'Agreed! I will post the mockups shortly.',
    created_at: '2025-11-18T10:05:00Z',
    updated_at: '2025-11-18T10:05:00Z',
    mentioned_users: [],
    reactions: {}
  }
];

export const Default: Story = {
  args: {
    comments: mockComments,
    onPostComment: (content) => alert(`Posted: ${content}`),
  },
};
