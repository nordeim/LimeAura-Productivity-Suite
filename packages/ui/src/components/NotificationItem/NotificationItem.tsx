/**
 * @file packages/ui/src/components/NotificationItem/NotificationItem.tsx
 * @purpose Notification display row.
 * @interface Alert component
 * @phase 5
 */
import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import styles from './NotificationItem.module.css';

export interface NotificationItemProps {
  id: string;
  avatarName: string;
  avatarSrc?: string;
  content: React.ReactNode;
  timestamp: string;
  isRead: boolean;
  onClick: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  avatarName,
  avatarSrc,
  content,
  timestamp,
  isRead,
  onClick,
}) => {
  return (
    <button
      className={`${styles.item} ${isRead ? styles.read : ''}`}
      onClick={() => onClick(id)}
    >
      <Avatar name={avatarName} src={avatarSrc} size="md" />
      <div className={styles.content}>
        <div className={styles.text}>{content}</div>
        <time className={styles.timestamp}>{timestamp}</time>
      </div>
      {!isRead && <div className={styles.unreadDot} />}
    </button>
  );
};
