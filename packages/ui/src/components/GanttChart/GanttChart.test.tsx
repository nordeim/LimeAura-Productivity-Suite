/**
 * @file packages/ui/src/components/GanttChart/GanttChart.test.tsx
 * @purpose Tests for the GanttChart component skeleton.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GanttChart } from './GanttChart';

const tasks = [
  { id: 't-1', name: 'Task 1', start: new Date(), end: new Date() },
  { id: 't-2', name: 'Task 2', start: new Date(), end: new Date() },
];

describe('GanttChart', () => {
  it('renders task labels', () => {
    render(<GanttChart tasks={tasks} />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
