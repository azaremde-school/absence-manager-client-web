import { GetterTree } from 'vuex';
import ICalendarStore from './calendar-store';
import IRootState from '../../root-state';

const getters: GetterTree<ICalendarStore, IRootState> = {
  events: state => state.events
}

export default getters;