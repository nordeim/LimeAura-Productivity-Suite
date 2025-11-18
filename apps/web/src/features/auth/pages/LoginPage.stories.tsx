/**
 * @file apps/web/src/features/auth/pages/LoginPage.stories.tsx
 * @purpose Storybook stories for the LoginPage.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from './LoginPage';

const meta = {
  title: 'Features/Auth/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
