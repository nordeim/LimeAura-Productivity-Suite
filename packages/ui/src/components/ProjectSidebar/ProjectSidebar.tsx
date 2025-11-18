/**
 * @file packages/ui/src/components/ProjectSidebar/ProjectSidebar.tsx
 * @purpose Project navigation sidebar.
 * @interface Navigation component
 * @phase 6
 */
import React from 'react';
import { Icon } from '../Icon/Icon';
import styles from './ProjectSidebar.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export interface ProjectSidebarProps {
  navItems: NavItem[];
  activeId: string;
  className?: string;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  navItems,
  activeId,
  className,
}) => {
  return (
    <nav className={`${styles.sidebar} ${className || ''}`}>
      <div className={styles.header}>
        <span className={styles.logo}>L</span>
        <h2 className={styles.title}>Project</h2>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className={`${styles.navItem} ${
                item.id === activeId ? styles.active : ''
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
