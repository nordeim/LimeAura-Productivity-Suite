/**
 * @file packages/ui/src/components/CommandPalette/CommandPalette.tsx
 * @purpose Command palette component.
 * @interface Quick actions
 * @phase 6
 */
import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { Icon } from '../Icon/Icon';
import styles from './CommandPalette.module.css';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // This should be toggle, but for storybook close is fine
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <Command.Dialog
        open={isOpen}
        onOpenChange={(open) => !open && onClose()}
        label="Global Command Menu"
        className={styles.dialog}
      >
        <div className={styles.searchWrapper}>
          <Icon name="Search" size={18} />
          <Command.Input
            className={styles.input}
            placeholder="Type a command or search..."
          />
        </div>
        <Command.List className={styles.list}>
          <Command.Empty className={styles.empty}>No results found.</Command.Empty>

          <Command.Group heading="Tasks" className={styles.group}>
            <Command.Item className={styles.item}>
              <Icon name="PlusCircle" size={16} /> Create New Task
            </Command.Item>
            <Command.Item className={styles.item}>
              <Icon name="Check" size={16} /> My Tasks
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Navigation" className={styles.group}>
            <Command.Item className={styles.item}>
              <Icon name="Home" size={16} /> Go to Dashboard
            </Command.Item>
            <Command.Item className={styles.item}>
              <Icon name="Settings" size={16} /> Go to Settings
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </div>
  );
};
