/**
 * @file packages/ui/src/components/GanttChart/GanttChart.tsx
 * @purpose Gantt chart component (skeleton).
 * @interface Timeline view
 * @phase 6
 */
import React from 'react';
import styles from './GanttChart.module.css';

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  dependencies?: string[];
}

export interface GanttChartProps {
  tasks: GanttTask[];
  className?: string;
}

// NOTE: A real Gantt chart is extremely complex.
// This is a placeholder skeleton as per the execution plan.
export const GanttChart: React.FC<GanttChartProps> = ({ tasks, className }) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.sidebar}>
        <div className={styles.header}>Task Name</div>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskLabel}>
            {task.name}
          </div>
        ))}
      </div>
      <div className={styles.timeline}>
        <div className={styles.header}>Timeline</div>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskBarWrapper}>
            <div
              className={styles.taskBar}
              style={{ left: '10%', width: '30%' }} // Placeholder positioning
            >
              {task.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
