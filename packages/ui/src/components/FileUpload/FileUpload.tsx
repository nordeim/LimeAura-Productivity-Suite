/**
 * @file packages/ui/src/components/FileUpload/FileUpload.tsx
 * @purpose File upload dropzone component.
 * @interface Upload control
 * @phase 5
 */
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '../Icon/Icon';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
  multiple?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onDrop,
  className,
  multiple = true,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  const classNames = [
    styles.dropzone,
    isDragActive ? styles.active : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div {...getRootProps()} className={classNames}>
      <input {...getInputProps()} />
      <Icon name="UploadCloud" size={32} className={styles.icon} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
