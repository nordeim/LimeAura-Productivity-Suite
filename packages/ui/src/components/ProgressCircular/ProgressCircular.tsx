/**
 * @file packages/ui/src/components/ProgressCircular/ProgressCircular.tsx
 * @purpose Circular progress indicator.
 * @interface Progress indicator
 * @phase 5
 */
import React from 'react';
import styles from './ProgressCircular.module.css';

export interface ProgressCircularProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export const ProgressCircular: React.FC<ProgressCircularProps> = ({
  value,
  size = 40,
  strokeWidth = 4,
  showLabel = true,
  label,
  className,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={`${styles.wrapper} ${className || ''}`}
      style={{ width: size, height: size }}
    >
      <svg className={styles.svg} width={size} height={size}>
        <circle
          className={styles.track}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className={styles.fill}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showLabel && (
        <span className={styles.label}>{label || `${Math.round(value)}%`}</span>
      )}
    </div>
  );
};
