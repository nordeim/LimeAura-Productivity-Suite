/**
 * @file packages/ui/src/components/Card/Card.tsx
 * @purpose Card container component.
 * @interface Content container
 * @phase 5
 */
import React from 'react';
import { AnimationOrchestrator } from '@/utils/AnimationOrchestrator';
import styles from './Card.module.css';

export interface CardProps {
  variant?: 'default' | 'hero' | 'compact';
  hoverable?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // For animation delays
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const orchestrator = AnimationOrchestrator.getInstance();

  const classNames = [
    styles.card,
    styles[variant],
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleRef = (el: HTMLDivElement | null) => {
    if (el) {
      orchestrator.scheduleAnimation(el, {
        animation: 'fadeInUp',
        duration: 600,
      });
    }
  };

  return (
    <div ref={handleRef} className={classNames} onClick={onClick} {...props}>
      {children}
    </div>
  );
};
