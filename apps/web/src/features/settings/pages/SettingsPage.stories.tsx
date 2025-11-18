/**
 * @file apps/web/src/features/settings/pages/SettingsPage.stories.tsx
 * @purpose Storybook stories for the SettingsPage.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { SettingsPage } from './SettingsPage';

const meta = {
  title: 'Features/Settings/SettingsPage',
  component: SettingsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
