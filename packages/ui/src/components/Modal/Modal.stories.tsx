/**
 * @file packages/ui/src/components/Modal/Modal.stories.tsx
 * @purpose Storybook stories for the Modal component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Modal>;

export default meta;

const ModalWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is the content of the modal. You can put anything here.</p>
        <br />
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Modal>
    </>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: ModalWithState,
  args: {
    title: 'My Modal Title',
    size: 'md',
  },
};

export const Small: StoryObj<typeof meta> = {
  render: ModalWithState,
  args: {
    title: 'Small Modal',
    size: 'sm',
  },
};

export const Large: StoryObj<typeof meta> = {
  render: ModalWithState,
  args: {
    title: 'Large Modal',
    size: 'lg',
  },
};
