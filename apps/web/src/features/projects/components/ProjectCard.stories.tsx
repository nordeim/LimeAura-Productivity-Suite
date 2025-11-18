/**
 * @file apps/web/src/features/projects/components/ProjectCard.stories.tsx
 * @purpose Storybook stories for the ProjectCard.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from './ProjectCard';
import { Project } from '@limeaura/types';

const meta = {
  title: 'Features/Projects/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProject: Project = {
  id: 'p-1',
  workspace_id: 'w-1',
  identifier: 'LIME',
  name: 'LimeAura Platform',
  description: 'Build the next-gen productivity suite.',
  status: 'active',
  created_by: 'u-1',
  created_at: '',
  updated_at: '',
};

export const Default: Story = {
  args: {
    project: mockProject,
  },
};
