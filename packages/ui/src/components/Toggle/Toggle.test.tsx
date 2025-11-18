/**
 * @file packages/ui/src/components/Toggle/Toggle.test.tsx
 * @purpose Tests for the Toggle component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with label and is unchecked by default', () => {
    render(<Toggle label="Enable" checked={false} onChange={() => {}} />);
    const switchEl = screen.getByRole('switch', { name: 'Enable' });
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).not.toBeChecked();
  });

  it('is checked when checked prop is true', () => {
    render(<Toggle label="Enable" checked={true} onChange={() => {}} />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Toggle label="Enable" checked={false} onChange={handleChange} />);
    const switchEl = screen.getByRole('switch');
    fireEvent.click(switchEl);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    const handleChange = vi.fn();
    render(<Toggle label="Enable" checked={false} onChange={handleChange} disabled />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toBeDisabled();
    fireEvent.click(switchEl);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
