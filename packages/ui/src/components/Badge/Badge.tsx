/**
 * @file packages/ui/src/components/Badge/Badge.tsx
 * @purpose Badge component for status indicators.
 * @interface Status indicator
 * @phase 4
 */
import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  className,
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
};
