/**
 * @file packages/ui/src/components/Icon/Icon.stories.tsx
 * @purpose Storybook stories for the Icon component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { icons } from 'lucide-react';

const iconNames = Object.keys(icons) as (keyof typeof icons)[];

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: { control: 'number' },
    color: { control: 'color' },
    strokeWidth: { control: { type: 'range', min: 1, max: 3, step: 0.5 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Home',
    size: 24,
  },
};

export const Colored: Story = {
  args: {
    name: 'Heart',
    size: 24,
    color: 'var(--color-semantic-danger)',
  },
};

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', maxWidth: '600px' }}>
      {iconNames.slice(0, 50).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', width: '80px' }}>
          <Icon name={name} size={24} />
          <span style={{ fontSize: '10px' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  }
};
