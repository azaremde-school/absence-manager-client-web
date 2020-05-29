import ICalendarEvent from '@/abstract/calendar-event';

export default interface ICalendarStore {
  events: ICalendarEvent[]
}