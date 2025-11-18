/**
 * @file packages/ui/src/components/Icon/Icon.tsx
 * @purpose Icon component wrapper for lucide-react.
 * @interface SVG wrapper
 * @phase 4
 */
import React from 'react';
import { icons, LucideProps } from 'lucide-react';
import styles from './Icon.module.css';

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className,
  ...props
}) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon: '${name}' not found in lucide-react.`);
    return null;
  }

  return (
    <LucideIcon
      className={`${styles.icon} ${className || ''}`}
      {...props}
    />
  );
};
