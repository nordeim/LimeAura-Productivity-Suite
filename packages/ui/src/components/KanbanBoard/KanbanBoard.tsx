/**
 * @file packages/ui/src/components/KanbanBoard/KanbanBoard.tsx
 * @purpose Kanban board component with drag-and-drop.
 * @interface Task board
 * @phase 6
 */
import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Task } from '@limeaura/types';
import { TaskItem } from '../TaskItem/TaskItem';
import { Icon } from '../Icon/Icon';
import styles from './KanbanBoard.module.css';

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: Task[];
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onTaskMove: (result: DropResult) => void;
  className?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  onTaskMove,
  className,
}) => {
  return (
    <DragDropContext onDragEnd={onTaskMove}>
      <div className={`${styles.board} ${className || ''}`}>
        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.column}
              >
                <header className={styles.columnHeader}>
                  <h3 className={styles.columnTitle}>{column.title}</h3>
                  <span className={styles.taskCount}>{column.tasks.length}</span>
                </header>
                <div className={styles.taskList}>
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={styles.taskWrapper}
                        >
                          <TaskItem task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <button className={styles.addTaskButton}>
                  <Icon name="Plus" size={16} /> Add task
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
