/**
 * @file packages/ui/src/components/CommentThread/CommentThread.test.tsx
 * @purpose Tests for the CommentThread component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommentThread } from './CommentThread';
import { Comment } from '@limeaura/types';

const mockComments: Comment[] = [
  {
    id: 'c-1',
    task_id: 't-1',
    author_id: 'u-1',
    author: { id: 'u-1', email: 'a@b.c', full_name: 'Jane Doe', status: 'active', created_at: '', updated_at: '' },
    content: 'This is the first comment.',
    created_at: '2025-11-18T10:00:00Z',
    updated_at: '2025-11-18T10:00:00Z',
    mentioned_users: [],
    reactions: {}
  }
];

describe('CommentThread', () => {
  it('renders comments', () => {
    render(<CommentThread comments={mockComments} onPostComment={() => {}} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('This is the first comment.')).toBeInTheDocument();
  });

  it('renders comment input', () => {
    render(<CommentThread comments={[]} onPostComment={() => {}} />);
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Post Comment' })).toBeInTheDocument();
  });
});
