/**
 * @file apps/web/src/features/search/components/GlobalSearch.stories.tsx
 * @purpose Storybook stories for the GlobalSearch component.
 * @phase 7
 */
import type { Meta, StoryObj } from '@storybook/react';
import { GlobalSearch } from './GlobalSearch';
import { Button } from '@limeaura/ui';
import { useState } from 'react';

const meta = {
  title: 'Features/Search/GlobalSearch',
  component: GlobalSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GlobalSearch>;

export default meta;

const SearchWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Search (or Ctrl+K)</Button>
      <GlobalSearch {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: SearchWithState,
};
