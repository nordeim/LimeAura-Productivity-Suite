/**
 * @file packages/ui/src/components/Dropdown/Dropdown.test.tsx
 * @purpose Tests for the Dropdown component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';

const items = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
];

describe('Dropdown', () => {
  it('opens and closes when trigger is clicked', () => {
    render(
      <Dropdown trigger={<Button>Open</Button>} items={items} onSelect={() => {}} />
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    
    // Not visible initially
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Edit' })).toBeInTheDocument();

    // Click to close
    fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('calls onSelect and closes when an item is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <Dropdown trigger={<Button>Open</Button>} items={items} onSelect={handleSelect} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    
    fireEvent.click(screen.getByRole('option', { name: 'Delete' }));
    
    expect(handleSelect).toHaveBeenCalledWith('delete');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
