/**
 * @file packages/ui/src/components/Tooltip/Tooltip.stories.tsx
 * @purpose Storybook stories for the Tooltip component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip!',
    children: <Button>Hover Over Me</Button>,
    placement: 'top',
  },
};

export const OnIcon: Story = {
  args: {
    content: 'Settings',
    children: <Button variant="ghost" icon={<span>⚙️</span>} />,
    placement: 'bottom',
  },
};
