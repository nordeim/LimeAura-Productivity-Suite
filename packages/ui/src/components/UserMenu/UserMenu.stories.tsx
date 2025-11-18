/**
 * @file packages/ui/src/components/UserMenu/UserMenu.stories.tsx
 * @purpose Storybook stories for the UserMenu component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from './UserMenu';

const meta = {
  title: 'Organisms/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Jane Doe',
    userEmail: 'jane.doe@limeaura.com',
    onSelect: (value) => alert(`Selected: ${value}`),
  },
};
