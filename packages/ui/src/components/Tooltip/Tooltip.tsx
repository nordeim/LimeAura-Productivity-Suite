/**
 * @file packages/ui/src/components/Tooltip/Tooltip.tsx
 * @purpose Tooltip component.
 * @interface Contextual info
 * @phase 4
 */
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] =
    useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] =
    useState<HTMLDivElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowElement } },
        { name: 'offset', options: { offset: [0, 8] } },
      ],
    }
  );

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <>
      {React.cloneElement(children, {
        ref: setReferenceElement,
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      })}
      {visible && (
        <div
          ref={setPopperElement}
          className={`${styles.tooltip} ${className || ''}`}
          style={popperStyles.popper}
          role="tooltip"
          {...attributes.popper}
        >
          {content}
          <div
            ref={setArrowElement}
            className={styles.arrow}
            style={popperStyles.arrow}
          />
        </div>
      )}
    </>
  );
};
