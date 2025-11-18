/**
 * @file packages/ui/src/components/NotificationCenter/NotificationCenter.test.tsx
 * @purpose Tests for the NotificationCenter component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationCenter } from './NotificationCenter';

const notifs = [
  { id: 'n-1', avatarName: 'A', content: 'Notif 1', timestamp: '1m', isRead: false },
];

describe('NotificationCenter', () => {
  it('renders notifications', () => {
    render(<NotificationCenter notifications={notifs} onNotificationClick={() => {}} onClearAll={() => {}} />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Notif 1')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<NotificationCenter notifications={[]} onNotificationClick={() => {}} onClearAll={() => {}} />);
    expect(screen.getByText('No new notifications')).toBeInTheDocument();
  });
});
