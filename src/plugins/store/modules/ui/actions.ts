import { ActionTree } from 'vuex';
import IUIStore from './ui-store';
import IRootState from '../../root-state';

const actions: ActionTree<IUIStore, IRootState> = {
  setSidebar(context, value: boolean) {
    context.commit('SET_SIDEBAR', value);
  },

  openSidebar(context) {
    context.commit('OPEN_SIDEBAR');
  },

  closeSidebar(context) {
    context.commit('CLOSE_SIDEBAR');
  },

  toggleSidebar(context) {
    context.commit('TOGGLE_SIDEBAR');
  }
};

export default actions;
