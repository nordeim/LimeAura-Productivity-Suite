/**
 * @file packages/ui/src/components/ProjectSidebar/ProjectSidebar.stories.tsx
 * @purpose Storybook stories for the ProjectSidebar component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectSidebar } from './ProjectSidebar';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Organisms/ProjectSidebar',
  component: ProjectSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { id: 'board', label: 'Kanban Board', icon: <Icon name="LayoutGrid" size={18} />, href: '#' },
  { id: 'gantt', label: 'Timeline', icon: <Icon name="BarChart3" size={18} />, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: <Icon name="Calendar" size={18} />, href: '#' },
  { id: 'settings', label: 'Settings', icon: <Icon name="Settings" size={18} />, href: '#' },
];

export const Default: Story = {
  args: {
    navItems: navItems,
    activeId: 'board',
  },
};
