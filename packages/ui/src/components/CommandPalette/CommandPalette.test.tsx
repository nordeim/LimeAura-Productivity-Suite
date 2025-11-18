/**
 * @file packages/ui/src/components/CommandPalette/CommandPalette.test.tsx
 * @purpose Tests for the CommandPalette component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandPalette } from './CommandPalette';

describe('CommandPalette', () => {
  it('renders when open', () => {
    render(<CommandPalette isOpen={true} onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type a command or search...')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<CommandPalette isOpen={false} onClose={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters items based on input', () => {
    render(<CommandPalette isOpen={true} onClose={() => {}} />);
    const input = screen.getByPlaceholderText('Type a command or search...');
    
    fireEvent.change(input, { target: { value: 'settings' } });
    
    expect(screen.getByText('Go to Settings')).toBeInTheDocument();
    expect(screen.queryByText('Create New Task')).not.toBeInTheDocument();
  });
});
