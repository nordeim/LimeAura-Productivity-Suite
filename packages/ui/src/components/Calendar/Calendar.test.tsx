/**
 * @file packages/ui/src/components/Calendar/Calendar.test.tsx
 * @purpose Tests for the Calendar component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';

const events = [
  { id: 'e-1', title: 'Test Event', start: new Date(), end: new Date() },
];

describe('Calendar', () => {
  it('renders the calendar and event', () => {
    render(<Calendar events={events} />);
    // Check for toolbar text
    expect(screen.getByText('Today')).toBeInTheDocument();
    // Check for event
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });
});
