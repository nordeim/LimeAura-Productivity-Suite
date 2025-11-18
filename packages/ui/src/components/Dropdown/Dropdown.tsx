/**
 * @file packages/ui/src/components/Dropdown/Dropdown.tsx
 * @purpose Dropdown menu component.
 * @interface Selection control
 * @phase 5
 */
import React, { useState, useId } from 'react';
import { usePopper } from 'react-popper';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  trigger: React.ReactElement;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  placement?: 'bottom-start' | 'bottom-end';
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  placement = 'bottom-end',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] =
    useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
    }
  );

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      {React.cloneElement(trigger, {
        ref: setReferenceElement,
        onClick: () => setIsOpen(!isOpen),
        'aria-haspopup': 'listbox',
        'aria-expanded': isOpen,
      })}
      {isOpen && (
        <div
          ref={setPopperElement}
          className={styles.menu}
          style={popperStyles.popper}
          role="listbox"
          {...attributes.popper}
        >
          {items.map((item) => (
            <button
              key={item.value}
              className={styles.item}
              onClick={() => handleSelect(item.value)}
              role="option"
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
