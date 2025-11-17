/**
 * @file packages/ui/src/components/Input/Input.stories.tsx
 * @purpose Storybook stories for the Input component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password'] },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Jane Doe',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'jane@acme.com',
    type: 'email',
    error: 'Please enter a valid email address.',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You cannot edit this',
    disabled: true,
  },
};
