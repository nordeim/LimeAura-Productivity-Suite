/**
 * @file packages/ui/src/components/TaskForm/TaskForm.tsx
 * @purpose Form for creating/editing tasks.
 * @interface Form component
 * @phase 6
 */
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from '../Input/Input';
import { DatePicker } from '../DatePicker/DatePicker';
import { TagInput } from '../TagInput/TagInput';
import { Button } from '../Button/Button';
import styles from './TaskForm.module.css';

// This is a presentational component. Form state and logic
// will be handled by a form library (e.g., react-hook-form) in Phase 7.
export const TaskForm: React.FC = () => {
  return (
    <form className={styles.form}>
      <Input label="Task Title" placeholder="What needs to be done?" />
      
      <div className={styles.editorWrapper}>
        <label className={styles.label}>Description</label>
        <ReactQuill theme="snow" />
      </div>

      <div className={styles.grid}>
        <Input label="Assignee" placeholder="Select user" />
        <DatePicker selected={undefined} onSelect={() => {}} placeholder="Due Date" />
        <Input label="Priority" placeholder="Set priority" />
        <Input label="Status" placeholder="Set status" />
      </div>

      <TagInput tags={[]} onChange={() => {}} placeholder="Add tags" />

      <div className={styles.actions}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save Task</Button>
      </div>
    </form>
  );
};
