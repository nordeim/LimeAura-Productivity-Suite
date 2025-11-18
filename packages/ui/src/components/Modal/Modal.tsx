/**
 * @file packages/ui/src/components/Modal/Modal.tsx
 * @purpose Modal dialog component.
 * @interface Overlay component
 * @phase 5
 */
import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { Icon } from '../Icon/Icon';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
}) => {
  const titleId = useId();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined' || !isOpen) {
    return null;
  }

  return createPortal(
    <FocusLock returnFocus>
      <div
        className={styles.backdrop}
        onClick={onClose}
        role="presentation"
      >
        <div
          className={`${styles.modal} ${styles[size]}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          onClick={(e) => e.stopPropagation()} // Prevent backdrop click
        >
          <header className={styles.header}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </header>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </FocusLock>,
    document.body
  );
};
