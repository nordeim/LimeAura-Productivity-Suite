/**
 * @file packages/ui/src/components/Toggle/Toggle.stories.tsx
 * @purpose Storybook stories for the Toggle component.
 * @interface Storybook stories
 * @phase 4
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelPosition: { control: 'radio', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Toggle {...args} checked={checked} onChange={setChecked} />
  );
};

export const Default: Story = {
  render: ToggleWithState,
  args: {
    label: 'Enable Notifications',
    checked: false,
  },
};

export const Checked: Story = {
  render: ToggleWithState,
  args: {
    label: 'Dark Mode',
    checked: true,
  },
};

export const LabelLeft: Story = {
  render: ToggleWithState,
  args: {
    label: 'Label on Left',
    labelPosition: 'left',
    checked: false,
  },
};

export const Disabled: Story = {
  render: ToggleWithState,
  args: {
    label: 'Disabled',
    checked: false,
    disabled: true,
  },
};
