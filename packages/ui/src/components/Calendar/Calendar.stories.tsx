/**
 * @file packages/ui/src/components/Calendar/Calendar.stories.tsx
 * @purpose Storybook stories for the Calendar component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta = {
  title: 'Organisms/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = new Date();
const events = [
  {
    id: '1',
    title: 'Sprint Planning',
    start: now,
    end: new Date(now.getTime() + 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Design Review',
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 15, 30),
  },
];

export const MonthView: Story = {
  args: {
    view: 'month',
    events: events,
  },
};

export const WeekView: Story = {
  args: {
    view: 'week',
    events: events,
  },
};
