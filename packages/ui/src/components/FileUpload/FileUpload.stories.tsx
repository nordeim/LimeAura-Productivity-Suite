/**
 * @file packages/ui/src/components/FileUpload/FileUpload.stories.tsx
 * @purpose Storybook stories for the FileUpload component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { useState } from 'react';

const meta = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

const FileUploadWithState = (args: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };
  return (
    <div style={{ width: '400px' }}>
      <FileUpload {...args} onDrop={handleDrop} />
      {files.length > 0 && (
        <ul style={{ marginTop: '1rem' }}>
          {files.map(file => (
            <li key={file.name}>{file.name} - {file.size} bytes</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: FileUploadWithState,
  args: {
    multiple: true,
  },
};
