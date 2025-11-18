/**
 * @file packages/ui/src/components/Dashboard/Dashboard.tsx
 * @purpose Dashboard grid layout component.
 * @interface Widget container
 * @phase 6
 */
import React from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './Dashboard.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface DashboardProps {
  layout: Layout[];
  children: React.ReactNode[];
  onLayoutChange: (layout: Layout[]) => void;
  isEditable?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  layout,
  children,
  onLayoutChange,
  isEditable = false,
}) => {
  return (
    <ResponsiveGridLayout
      className={`${styles.layout} ${isEditable ? styles.editable : ''}`}
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      onLayoutChange={(layout) => onLayoutChange(layout)}
      isDraggable={isEditable}
      isResizable={isEditable}
    >
      {React.Children.map(children, (child, index) => (
        <div key={layout[index].i} className={styles.widget}>
          {child}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};
