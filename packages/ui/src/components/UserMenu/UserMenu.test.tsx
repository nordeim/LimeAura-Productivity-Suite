/**
 * @file packages/ui/src/components/UserMenu/UserMenu.test.tsx
 * @purpose Tests for the UserMenu component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserMenu } from './UserMenu';

describe('UserMenu', () => {
  it('renders user info and opens dropdown', () => {
    render(
      <UserMenu
        userName="Jane Doe"
        userEmail="jane@acme.com"
        onSelect={() => {}}
      />
    );
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@acme.com')).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
