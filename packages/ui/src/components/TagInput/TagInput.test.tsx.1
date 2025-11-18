/**
 * @file packages/ui/src/components/TagInput/TagInput.test.tsx
 * @purpose Tests for the TagInput component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from './TagInput';

describe('TagInput', () => {
  it('adds a tag on Enter', () => {
    const handleChange = vi.fn();
    render(<TagInput tags={[]} onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(handleChange).toHaveBeenCalledWith(['react']);
    expect(input).toHaveValue('');
  });

  it('removes a tag on click', () => {
    const handleChange = vi.fn();
    render(<TagInput tags={['react', 'typescript']} onChange={handleChange} />);
    
    const removeButton = screen.getByText('react').querySelector('button');
    fireEvent.click(removeButton as HTMLElement);
    
    expect(handleChange).toHaveBeenCalledWith(['typescript']);
  });
});
