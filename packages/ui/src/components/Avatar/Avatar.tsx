/**
 * @file packages/ui/src/components/Avatar/Avatar.tsx
 * @purpose Avatar component.
 * @interface User representation
 * @phase 4
 */
import React from 'react';
import { ComponentSize } from '@limeaura/types';
import styles from './Avatar.module.css';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: ComponentSize | 'xl';
  className?: string;
}

// Simple hash to get a color index from a name
const getColorIndex = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % 5; // 5 colors defined in CSS
};

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length === 1) {
    return name.substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
}) => {
  const classNames = [
    styles.avatar,
    styles[size],
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={classNames}
        onError={(e) => {
          // Hide img on error to show fallback
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  const colorIndex = getColorIndex(name);
  const fallbackClassNames = `${classNames} ${styles.fallback} ${styles[`color${colorIndex}`]}`;

  return (
    <div className={fallbackClassNames} aria-label={name}>
      {getInitials(name)}
    </div>
  );
};
