/**
 * @file packages/ui/src/components/Calendar/Calendar.tsx
 * @purpose Full calendar view component.
 * @interface Date grid
 * @phase 6
 */
import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/enUS';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.module.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export interface CalendarProps {
  view?: 'month' | 'week' | 'day';
  events: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: any) => void;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  view = 'month',
  events,
  onSelectEvent,
  onSelectSlot,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        style={{ height: 600 }}
      />
    </div>
  );
};
