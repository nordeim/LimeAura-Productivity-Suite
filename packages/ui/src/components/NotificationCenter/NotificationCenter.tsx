/**
 * @file packages/ui/src/components/NotificationCenter/NotificationCenter.tsx
 * @purpose Notification panel.
 * @interface Alert center
 * @phase 6
 */
import React from 'react';
import { NotificationItem, NotificationItemProps } from '../NotificationItem/NotificationItem';
import { Button } from '../Button/Button';
import styles from './NotificationCenter.module.css';

export interface NotificationCenterProps {
  notifications: Omit<NotificationItemProps, 'onClick'>[];
  onNotificationClick: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onNotificationClick,
  onClearAll,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <header className={styles.header}>
        <h3 className={styles.title}>Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
      </header>
      <div className={styles.list}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              {...notification}
              onClick={onNotificationClick}
            />
          ))
        ) : (
          <p className={styles.empty}>No new notifications</p>
        )}
      </div>
    </div>
  );
};
