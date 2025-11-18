/**
 * @file packages/ui/src/components/CommentThread/CommentThread.tsx
 * @purpose Comment thread component.
 * @interface Discussion component
 * @phase 6
 */
import React from 'react';
import { Comment } from '@limeaura/types';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import styles from './CommentThread.module.css';

export interface CommentThreadProps {
  comments: Comment[];
  onPostComment: (content: string) => void;
  className?: string;
}

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
  <div className={styles.commentItem}>
    <Avatar name={comment.author?.full_name || 'User'} size="md" />
    <div className={styles.commentBody}>
      <div className={styles.commentHeader}>
        <span className={styles.author}>{comment.author?.full_name}</span>
        <span className={styles.timestamp}>
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <div className={styles.content}>{comment.content}</div>
    </div>
  </div>
);

export const CommentThread: React.FC<CommentThreadProps> = ({
  comments,
  onPostComment,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <div className={styles.newComment}>
        <Avatar name="Current User" size="md" />
        <textarea
          className={styles.commentInput}
          placeholder="Add a comment..."
        />
      </div>
      <div className={styles.actions}>
        <Button onClick={() => onPostComment('...')} size="sm">
          Post Comment
        </Button>
      </div>
    </div>
  );
};
