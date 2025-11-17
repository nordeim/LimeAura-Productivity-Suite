/**
 * @file packages/ui/src/components/Button/Button.tsx
 * @purpose Button component as defined in the Master Execution Plan.
 * @interface Interactive element
 * @phase 4
 */
import React, { forwardRef } from 'react';
import { ComponentSize, ComponentVariant } from '@limeaura/types';
import { AnimationOrchestrator } from '@/utils/AnimationOrchestrator';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant | 'success';
  size?: ComponentSize;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      children,
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const orchestrator = AnimationOrchestrator.getInstance();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;

      // Animation
      orchestrator.scheduleAnimation(e.currentTarget, {
        animation: 'elasticBounce', // From limeaura-design-system.json
        duration: 300,
        critical: true,
      });

      onClick?.(e);
    };

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth ? styles.fullWidth : '',
      loading ? styles.loading : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className={styles.spinner}>
            <Spinner size="sm" />
          </span>
        )}
        {icon && !loading && <span className={styles.icon}>{icon}</span>}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
