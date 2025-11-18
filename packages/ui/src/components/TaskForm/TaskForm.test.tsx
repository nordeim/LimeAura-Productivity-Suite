/**
 * @file packages/ui/src/components/TaskForm/TaskForm.test.tsx
 * @purpose Tests for the TaskForm component.
 * @interface Test suite
 * @phase 6
 */
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('renders form fields', () => {
    render(<TaskForm />);
    expect(screen.getByLabelText('Task Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Assignee')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Task' })).toBeInTheDocument();
  });
});
