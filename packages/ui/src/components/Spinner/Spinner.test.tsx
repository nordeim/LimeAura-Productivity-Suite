/**
 * @file packages/ui/src/components/Spinner/Spinner.test.tsx
 * @purpose Tests for the Spinner component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with correct accessible label', () => {
    render(<Spinner label="Processing payment..." />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Processing payment...')).toBeInTheDocument();
    expect(screen.getByText('Processing payment...')).toHaveClass('sr-only');
  });

  it('applies size and color classes', () => {
    render(<Spinner size="lg" color="neutral" />);
    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('lg');
    expect(spinner.className).toContain('neutral');
  });
});
