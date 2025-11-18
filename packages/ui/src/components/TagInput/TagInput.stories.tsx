/**
 * @file packages/ui/src/components/TagInput/TagInput.stories.tsx
 * @purpose Storybook stories for the TagInput component.
 * @interface Storybook stories
 * @phase 5
 */
import type { Meta, StoryObj } from '@storybook/react';
import { TagInput } from './TagInput';
import { useState } from 'react';

const meta = {
  title: 'Molecules/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof TagInput>;

export default meta;

const TagInputWithState = (args: any) => {
  const [tags, setTags] = useState(args.tags || []);
  return (
    <TagInput {...args} tags={tags} onChange={setTags} />
  );
};

export const Default: StoryObj<typeof meta> = {
  render: TagInputWithState,
  args: {
    placeholder: 'Add tags...',
  },
};

export const WithTags: StoryObj<typeof meta> = {
  render: TagInputWithState,
  args: {
    placeholder: 'Add tags...',
    tags: ['react', 'typescript', 'design-system'],
  },
};
