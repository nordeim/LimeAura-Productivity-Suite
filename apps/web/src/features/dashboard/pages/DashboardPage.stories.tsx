/**
 * @file apps/web/src/features/dashboard/pages/DashboardPage.stories.tsx
 * @purpose Storybook stories for the DashboardPage.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardPage } from './DashboardPage';

const meta = {
  title: 'Features/Dashboard/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
