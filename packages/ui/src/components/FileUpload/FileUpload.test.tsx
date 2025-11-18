/**
 * @file packages/ui/src/components/FileUpload/FileUpload.test.tsx
 * @purpose Tests for the FileUpload component.
 * @interface Test suite
 * @phase 5
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders dropzone text', () => {
    render(<FileUpload onDrop={() => {}} />);
    expect(screen.getByText(/drag 'n' drop/i)).toBeInTheDocument();
  });
  
  // Note: Testing actual file drops is complex in jsdom.
  // We'll rely on react-dropzone's own tests for that.
});
