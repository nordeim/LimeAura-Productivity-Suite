/**
 * @file packages/ui/src/components/DatePicker/DatePicker.test.tsx
 * @purpose Tests for the DatePicker component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('opens calendar on input focus', () => {
    render(<DatePicker selected={undefined} onSelect={() => {}} />);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    fireEvent.focus(screen.getByRole('textbox'));
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('calls onSelect when a day is clicked', () => {
    const handleSelect = vi.fn();
    render(<DatePicker selected={new Date('2025-12-01')} onSelect={handleSelect} />);
    fireEvent.focus(screen.getByRole('textbox'));
    
    // Click on the 15th
    fireEvent.click(screen.getByText('15'));
    expect(handleSelect).toHaveBeenCalled();
  });
});
