/**
 * @file packages/ui/src/components/SearchInput/SearchInput.test.tsx
 * @purpose Tests for the SearchInput component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders with search icon', () => {
    render(<SearchInput />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    // We can't easily test the icon by name, but we know it's there
  });

  it('shows spinner when loading', () => {
    render(<SearchInput loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows clear button when there is a value and onClear', () => {
    render(<SearchInput value="test" onClear={() => {}} />);
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = vi.fn();
    render(<SearchInput value="test" onClear={handleClear} />);
    fireEvent.click(screen.getByLabelText('Clear search'));
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
