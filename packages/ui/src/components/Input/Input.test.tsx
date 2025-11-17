/**
 * @file packages/ui/src/components/Input/Input.test.tsx
 * @purpose Tests for the Input component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with a label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders an error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('applies className and type', () => {
    render(<Input label="Password" type="password" className="my-class" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input.className).toContain('my-class');
  });
});
