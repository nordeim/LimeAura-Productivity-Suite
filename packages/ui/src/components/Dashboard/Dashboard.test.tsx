/**
 * @file packages/ui/src/components/Dashboard/Dashboard.test.tsx
 * @purpose Tests for the Dashboard component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('renders children widgets', () => {
    const layout = [{ i: 'a', x: 0, y: 0, w: 2, h: 2 }];
    render(
      <Dashboard layout={layout} onLayoutChange={() => {}}>
        <div>Widget A</div>
      </Dashboard>
    );
    expect(screen.getByText('Widget A')).toBeInTheDocument();
  });
});
