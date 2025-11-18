/**
 * @file packages/ui/src/components/CommandPalette/CommandPalette.stories.tsx
 * @purpose Storybook stories for the CommandPalette component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette } from './CommandPalette';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Organisms/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommandPalette>;

export default meta;

const CommandPaletteWithState = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Palette (or Ctrl+K)</Button>
      <CommandPalette {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: StoryObj<typeof meta> = {
  render: CommandPaletteWithState,
};
