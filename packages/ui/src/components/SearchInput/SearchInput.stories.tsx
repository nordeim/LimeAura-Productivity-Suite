/**
 * @file packages/ui/src/components/SearchInput/SearchInput.stories.tsx
 * @purpose Storybook stories for the SearchInput component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';
import { useState } from 'react';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

const SearchWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <SearchInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
};

export const Default: StoryObj<typeof meta> = {
  render: SearchWithState,
  args: {
    placeholder: 'Search tasks, projects...',
  },
};

export const WithValue: StoryObj<typeof meta> = {
  render: SearchWithState,
  args: {
    placeholder: 'Search tasks, projects...',
    value: 'Dashboard design',
  },
};

export const Loading: StoryObj<typeof meta> = {
  render: SearchWithState,
  args: {
    placeholder: 'Search tasks, projects...',
    value: 'Dashboard design',
    loading: true,
  },
};
