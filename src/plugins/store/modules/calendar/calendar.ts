import { Module } from 'vuex';
import IRootState from '../../root-state';
import ICalendarStore from './calendar-store';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import state from './state';

const page: Module<ICalendarStore, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default page;
