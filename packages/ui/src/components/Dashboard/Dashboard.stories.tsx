/**
 * @file packages/ui/src/components/Dashboard/Dashboard.stories.tsx
 * @purpose Storybook stories for the Dashboard component.
 * @interface Storybook stories
 * @phase 6
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';
import { Card } from '../Card/Card';
import { useState } from 'react';

const meta = {
  title: 'Organisms/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
} satisfies Meta<typeof Dashboard>;

export default meta;

const defaultLayout = [
  { i: 'a', x: 0, y: 0, w: 4, h: 2 },
  { i: 'b', x: 4, y: 0, w: 4, h: 2 },
  { i: 'c', x: 8, y: 0, w: 4, h: 2 },
];

const DashboardWithState = (args: any) => {
  const [layout, setLayout] = useState(defaultLayout);
  return (
    <Dashboard
      {...args}
      layout={layout}
      onLayoutChange={(newLayout) => setLayout(newLayout)}
    >
      <Card>Widget A</Card>
      <Card>Widget B</Card>
      <Card>Widget C</Card>
    </Dashboard>
  );
};

export const Editable: StoryObj<typeof meta> = {
  render: DashboardWithState,
  args: {
    isEditable: true,
  },
};

export const Static: StoryObj<typeof meta> = {
  render: DashboardWithState,
  args: {
    isEditable: false,
  },
};
