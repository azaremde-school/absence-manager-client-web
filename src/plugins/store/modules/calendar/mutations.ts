import { MutationTree } from 'vuex';
import ICalendarStore from './calendar-store';
import ICalendarEvent from '@/abstract/calendar-event';

const mutations: MutationTree<ICalendarStore> = {
  SET_EVENTS(state, events: ICalendarEvent[]) {
    state.events = events;
  },

  PUSH_EVENT(state, event: ICalendarEvent) {
    state.events.push(event);
  }
};

export default mutations;
