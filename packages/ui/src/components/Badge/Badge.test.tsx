/**
 * @file packages/ui/src/components/Badge/Badge.test.tsx
 * @purpose Tests for the Badge component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>In Progress</Badge>);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Badge variant="success" size="sm">Done</Badge>);
    const badge = screen.getByText('Done');
    expect(badge.className).toContain('success');
    expect(badge.className).toContain('sm');
  });

  it('applies default classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('neutral');
    expect(badge.className).toContain('md');
  });
});
