/**
 * @file apps/web/src/features/dashboard/widgets/TasksWidget.tsx
 * @purpose "My Tasks" widget for the dashboard.
 * @interface Task summary
 * @phase 7
 */
import React from 'react';
import { Card, Spinner, Icon } from '@limeaura/ui';
// import { useTasks } from '@/features/tasks/hooks/useTasks';
import styles from './TasksWidget.module.css';

export const TasksWidget: React.FC = () => {
  // const { data: tasks, isLoading } = useTasks({ assignedTo: 'me' });
  const isLoading = false;
  const tasks = [
    { id: 't-1', title: 'Task 1' },
    { id: 't-2', title: 'Task 2' },
  ];

  return (
    <Card variant="compact" className={styles.widget}>
      <header className={styles.header}>
        <h3 className={styles.title}>My Tasks</h3>
        <Icon name="MoreHorizontal" size={18} />
      </header>
      <div className={styles.content}>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <Icon name="Circle" size={12} className={styles.taskIcon} />
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
};
