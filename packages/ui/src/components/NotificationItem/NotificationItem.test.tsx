/**
 * @file packages/ui/src/components/NotificationItem/NotificationItem.test.tsx
 * @purpose Tests for the NotificationItem component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationItem } from './NotificationItem';

describe('NotificationItem', () => {
  const props = {
    id: 'n-1',
    avatarName: 'Jane Doe',
    content: <span>Jane mentioned you in <strong>LIME-1</strong></span>,
    timestamp: '5m ago',
    isRead: false,
    onClick: vi.fn(),
  };

  it('renders content and is unread', () => {
    render(<NotificationItem {...props} />);
    expect(screen.getByText('Jane mentioned you in')).toBeInTheDocument();
    expect(screen.getByText('LIME-1')).toBeInTheDocument();
    expect(screen.getByText('5m ago')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByRole('button').className).not.toContain('read');
  });

  it('renders in read state', () => {
    render(<NotificationItem {...props} isRead={true} />);
    expect(screen.getByRole('button').className).toContain('read');
  });

  it('calls onClick when clicked', () => {
    render(<NotificationItem {...props} />);
    fireEvent.click(screen.getByRole('button'));
    expect(props.onClick).toHaveBeenCalledWith('n-1');
  });
});
