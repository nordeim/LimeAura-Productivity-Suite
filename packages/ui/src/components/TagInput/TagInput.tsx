/**
 * @file packages/ui/src/components/TagInput/TagInput.tsx
 * @purpose Tag input component.
 * @interface Multi-value input
 * @phase 5
 */
import React, { useState } from 'react';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import styles from './TagInput.module.css';

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      {tags.map((tag) => (
        <Badge key={tag} variant="neutral" className={styles.tag}>
          {tag}
          <button onClick={() => removeTag(tag)} className={styles.removeButton}>
            <Icon name="X" size={12} />
          </button>
        </Badge>
      ))}
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
};
