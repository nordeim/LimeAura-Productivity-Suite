/**
 * @file packages/ui/src/components/DatePicker/DatePicker.stories.tsx
 * @purpose Storybook stories for the DatePicker component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useState } from 'react';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

const DatePickerWithState = (args: any) => {
  const [date, setDate] = useState<Date | undefined>(args.selected);
  return (
    <DatePicker {...args} selected={date} onSelect={setDate} />
  );
};

export const Default: StoryObj<typeof meta> = {
  render: DatePickerWithState,
  args: {
    placeholder: 'Select a date',
  },
};

export const Preselected: StoryObj<typeof meta> = {
  render: DatePickerWithState,
  args: {
    selected: new Date(),
  },
};
