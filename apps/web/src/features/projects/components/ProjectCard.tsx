/**
 * @file apps/web/src/features/projects/components/ProjectCard.tsx
 * @purpose Project card component for dashboards/lists.
 * @interface Project preview
 * @phase 7
 */
import React from 'react';
import { Card, ProgressCircular, Avatar, Badge } from '@limeaura/ui';
import { Project } from '@limeaura/types';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: Project;
}

// Mock users
const users = [
  { name: 'User 1' },
  { name: 'User 2' },
  { name: 'User 3' },
];

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card hoverable className={styles.card}>
      <div className={styles.header}>
        <span className={styles.identifier}>{project.identifier}</span>
        <Badge variant="success" size="sm">{project.status}</Badge>
      </div>
      <h3 className={styles.title}>{project.name}</h3>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.footer}>
        <div className={styles.avatars}>
          {users.map((u, i) => (
            <Avatar key={i} name={u.name} size="md" className={styles.avatar} />
          ))}
        </div>
        <ProgressCircular value={40} size={36} strokeWidth={4} />
      </div>
    </Card>
  );
};
