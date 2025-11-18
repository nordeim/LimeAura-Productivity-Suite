/**
 * @file packages/ui/src/components/SearchInput/SearchInput.tsx
 * @purpose Search input component.
 * @interface Search control
 * @phase 5
 */
import React from 'react';
import { Input, InputProps } from '../Input/Input';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import styles from './SearchInput.module.css';

export interface SearchInputProps extends InputProps {
  loading?: boolean;
  onClear?: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  loading,
  onClear,
  value,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.searchIcon}>
        <Icon name="Search" size={18} />
      </span>
      <Input
        type="search"
        className={styles.input}
        value={value}
        {...props}
      />
      {loading && (
        <span className={styles.spinner}>
          <Spinner size="sm" />
        </span>
      )}
      {!loading && value && onClear && (
        <button
          className={styles.clearButton}
          onClick={onClear}
          aria-label="Clear search"
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
};
