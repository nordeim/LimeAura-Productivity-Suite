/**
 * @file packages/ui/src/components/ProgressCircular/ProgressCircular.test.tsx
 * @purpose Tests for the ProgressCircular component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressCircular } from './ProgressCircular';

describe('ProgressCircular', () => {
  it('renders the percentage label', () => {
    render(<ProgressCircular value={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    render(<ProgressCircular value={30} label="3/10" />);
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  it('hides the label when showLabel is false', () => {
    render(<ProgressCircular value={50} showLabel={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('calculates stroke-dashoffset correctly', () => {
    const size = 40;
    const strokeWidth = 4;
    const value = 25;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const expectedOffset = circumference - (value / 100) * circumference;
    
    render(<ProgressCircular value={value} size={size} strokeWidth={strokeWidth} />);
    const fillCircle = screen.getByText('25%').previousSibling?.querySelector('circle:last-child');
    expect(fillCircle).toHaveAttribute('stroke-dashoffset', String(expectedOffset));
  });
});
