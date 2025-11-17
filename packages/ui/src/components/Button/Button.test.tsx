/**
 * @file packages/ui/src/components/Button/Button.test.tsx
 * @purpose Tests for the Button component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('fires onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is disabled and shows spinner when loading prop is true', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} loading>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('status')).toBeInTheDocument(); // Spinner has role="status"
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes', () => {
    render(<Button variant="secondary" size="lg">Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('secondary');
    expect(button.className).toContain('lg');
  });

  it('renders with an icon', () => {
    render(<Button icon={<span>Icon</span>}>Click Me</Button>);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });
});
