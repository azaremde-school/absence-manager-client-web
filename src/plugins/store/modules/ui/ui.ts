import { Module } from 'vuex';
import IRootState from '../../root-state';
import IUIStore from './ui-store';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import state from './state';

const page: Module<IUIStore, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default page;
