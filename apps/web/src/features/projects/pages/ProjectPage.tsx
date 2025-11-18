/**
 * @file apps/web/src/features/projects/pages/ProjectPage.tsx
 * @purpose Project detail page UI.
 * @interface Project view
 * @phase 7
 */
import React from 'react';
import { ProjectSidebar, Icon } from '@limeaura/ui';
import { TasksPage } from '@/features/tasks/pages/TasksPage';
import styles from './ProjectPage.module.css';

const navItems = [
  { id: 'board', label: 'Kanban Board', icon: <Icon name="LayoutGrid" size={18} />, href: '#' },
  { id: 'gantt', label: 'Timeline', icon: <Icon name="BarChart3" size={18} />, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: <Icon name="Calendar" size={18} />, href: '#' },
  { id: 'settings', label: 'Settings', icon: <Icon name="Settings" size={18} />, href: '#' },
];

export const ProjectPage: React.FC = () => {
  // TODO: Fetch project data
  return (
    <div className={styles.wrapper}>
      <ProjectSidebar navItems={navItems} activeId="board" />
      <main className={styles.mainContent}>
        <TasksPage />
      </main>
    </div>
  );
};
