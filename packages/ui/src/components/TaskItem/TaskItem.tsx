/**
 * @file packages/ui/src/components/TaskItem/TaskItem.tsx
 * @purpose Task list item component.
 * @interface Task display
 * @phase 5
 */
import React from 'react';
import { Task } from '@limeaura/types';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import styles from './TaskItem.module.css';

export interface TaskItemProps {
  task: Task;
  // TODO: Add onStatusChange, draggable props
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <span className={styles.identifier}>{task.identifier}</span>
        <Badge variant="primary" size="sm">
          {task.status}
        </Badge>
      </div>
      <p className={styles.title}>{task.title}</p>
      <div className={styles.footer}>
        <div className={styles.meta}>
          <Badge variant="neutral" size="sm">
            <Icon name="Star" size={12} /> {task.priority}
          </Badge>
          {task.due_date && (
            <span className={styles.date}>
              <Icon name="Calendar" size={12} /> {task.due_date}
            </span>
          )}
        </div>
        <div className={styles.assignee}>
          <Avatar name={task.assignee_id || 'Unassigned'} size="sm" />
        </div>
      </div>
    </div>
  );
};
