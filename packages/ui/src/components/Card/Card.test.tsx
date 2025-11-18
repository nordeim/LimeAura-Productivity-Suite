/**
 * @file packages/ui/src/components/Card/Card.test.tsx
 * @purpose Tests for the Card component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

// Mock AnimationOrchestrator
vi.mock('@/utils/AnimationOrchestrator', () => ({
  AnimationOrchestrator: {
    getInstance: vi.fn(() => ({
      scheduleAnimation: vi.fn(),
    })),
  },
}));

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText('Hello Card')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(<Card variant="compact">Compact Card</Card>);
    expect(screen.getByText('Compact Card').className).toContain('compact');
  });

  it('applies hoverable class', () => {
    render(<Card hoverable>Hover Card</Card>);
    expect(screen.getByText('Hover Card').className).toContain('hoverable');
  });

  it('fires onClick handler', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    fireEvent.click(screen.getByText('Clickable Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
