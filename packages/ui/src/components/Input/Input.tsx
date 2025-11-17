/**
 * @file packages/ui/src/components/Input/Input.tsx
 * @purpose Input component.
 * @interface Form control
 * @phase 4
 */
import React, { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type = 'text', className, wrapperClassName, ...props }, ref) => {
    const id = useId();

    return (
      <div className={`${styles.wrapper} ${wrapperClassName || ''}`}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={`${styles.input} ${error ? styles.error : ''} ${
            className || ''
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
