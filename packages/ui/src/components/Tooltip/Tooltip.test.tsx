/**
 * @file packages/ui/src/components/Tooltip/Tooltip.test.tsx
 * @purpose Tests for the Tooltip component.
 * @interface Test suite
 * @phase 4
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows tooltip content on mouse enter', () => {
    render(
      <Tooltip content="Hello world">
        <button>Hover me</button>
      </Tooltip>
    );

    // Tooltip not visible initially
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Hover to show
    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();

    // Mouse leave to hide
    fireEvent.mouseLeave(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip content on focus', () => {
    render(
      <Tooltip content="Hello world">
        <button>Focus me</button>
      </Tooltip>
    );

    // Tooltip not visible initially
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Focus to show
    fireEvent.focus(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // Blur to hide
    fireEvent.blur(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
