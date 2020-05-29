import { ActionTree } from 'vuex';
import ICalendarStore from './calendar-store';
import IRootState from '../../root-state';
import ICalendarEvent from '@/abstract/calendar-event';

const actions: ActionTree<ICalendarStore, IRootState> = {
  setEvents(context, events: ICalendarEvent[]) {
    context.commit('SET_EVENTS', events);
  },

  pushEvent(context, event: ICalendarEvent) {
    context.commit('PUSH_EVENT', event);
  }
};

export default actions;
