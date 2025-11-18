/**
 * @file apps/web/src/features/dashboard/pages/DashboardPage.tsx
 * @purpose Main user dashboard page.
 * @interface Overview page
 * @phase 7
 */
import React, { useState } from 'react';
import { Dashboard } from '@limeaura/ui';
import { TasksWidget } from '../widgets/TasksWidget';
import styles from './DashboardPage.module.css';

const defaultLayout = [
  { i: 'tasks', x: 0, y: 0, w: 4, h: 2 },
  { i: 'projects', x: 4, y: 0, w: 4, h: 2 },
  { i: 'activity', x: 8, y: 0, w: 4, h: 4 },
];

export const DashboardPage: React.FC = () => {
  const [layout, setLayout] = useState(defaultLayout);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Dashboard</h1>
      <Dashboard
        layout={layout}
        onLayoutChange={(l) => setLayout(l)}
        isEditable
      >
        <TasksWidget />
        <div>Widget B</div>
        <div>Widget C</div>
      </Dashboard>
    </div>
  );
};
