/**
 * @file packages/ui/src/components/DatePicker/DatePicker.tsx
 * @purpose Date selection component.
 * @interface Date control
 * @phase 5
 */
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { usePopper } from 'react-popper';
import { Input } from '../Input/Input';
import { Icon } from '../Icon/Icon';
import 'react-day-picker/dist/style.css';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onSelect,
  placeholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom-start',
    }
  );

  const handleDaySelect = (date: Date | undefined) => {
    onSelect(date);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`} ref={setReferenceElement}>
      <Input
        value={selected ? format(selected, 'PPP') : ''}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        readOnly
      />
      <Icon name="Calendar" className={styles.icon} />

      {isOpen && (
        <div
          ref={setPopperElement}
          className={styles.popper}
          style={popperStyles.popper}
          {...attributes.popper}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            initialFocus
          />
        </div>
      )}
    </div>
  );
};
