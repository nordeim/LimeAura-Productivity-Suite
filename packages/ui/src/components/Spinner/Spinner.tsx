/**
 * @file packages/ui/src/components/Spinner/Spinner.tsx
 * @purpose Loading spinner component.
 * @interface Loading indicator
 * @phase 4
 */
import React from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'neutral';
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label = 'Loading...',
  className,
}) => {
  const classNames = [
    styles.spinner,
    styles[size],
    styles[color],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="status"
      className={classNames}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
};
