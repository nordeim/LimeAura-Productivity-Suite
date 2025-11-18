/**
 * @file packages/ui/src/components/Avatar/Avatar.test.tsx
 * @purpose Tests for the Avatar component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="avatar.jpg" name="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'avatar.jpg');
  });

  it('renders initials when src is not provided', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByLabelText('Jane Doe')).toBeInTheDocument();
  });

  it('calculates initials for single name', () => {
    render(<Avatar name="Jane" />);
    expect(screen.getByText('JA')).toBeInTheDocument();
  });

  it('applies size class', () => {
    render(<Avatar name="Jane Doe" size="lg" />);
    expect(screen.getByText('JD').className).toContain('lg');
  });
});
