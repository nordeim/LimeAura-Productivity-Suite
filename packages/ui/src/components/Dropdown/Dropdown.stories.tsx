/**
 * @file packages/ui/src/components/Dropdown/Dropdown.stories.tsx
 * @purpose Storybook stories for the Dropdown component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end'],
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: 'profile', label: 'Profile', icon: <Icon name="User" size={16} /> },
  { value: 'settings', label: 'Settings', icon: <Icon name="Settings" size={16} /> },
  { value: 'logout', label: 'Log Out', icon: <Icon name="LogOut" size={16} /> },
];

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Open Menu</Button>,
    items: items,
    onSelect: (value) => alert(`Selected: ${value}`),
  },
};

export const WithIconTrigger: Story = {
  args: {
    trigger: (
      <Button variant="ghost" icon={<Icon name="MoreHorizontal" size={18} />}>
        <span className="sr-only">Options</span>
      </Button>
    ),
    items: items,
    onSelect: (value) => alert(`Selected: ${value}`),
    placement: 'bottom-end',
  },
};
