/**
 * @file packages/ui/src/components/Toggle/Toggle.tsx
 * @purpose Toggle switch component.
 * @interface Boolean control
 * @phase 4
 */
import React, { useId } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  labelPosition = 'right',
  disabled = false,
}) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`${styles.wrapper} ${
        labelPosition === 'left' ? styles.labelLeft : ''
      } ${disabled ? styles.disabled : ''}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.switch}>
        <input
          id={id}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-checked={checked}
        />
        <span className={styles.slider}>
          <span className={styles.handle}></span>
        </span>
      </div>
    </label>
  );
};
