/**
 * @file apps/web/src/features/projects/pages/ProjectPage.stories.tsx
 * @purpose Storybook stories for the ProjectPage.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectPage } from './ProjectPage';

const meta = {
  title: 'Features/Projects/ProjectPage',
  component: ProjectPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
