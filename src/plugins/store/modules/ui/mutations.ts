import { MutationTree } from 'vuex';
import IUIStore from './ui-store';

const mutations: MutationTree<IUIStore> = {
  SET_SIDEBAR(state, value: boolean) {
    state.sidebar = value;
  },
  OPEN_SIDEBAR(state) {
    state.sidebar = true;
  },
  CLOSE_SIDEBAR(state) {
    state.sidebar = false;
  },
  TOGGLE_SIDEBAR(state) {
    state.sidebar = !state.sidebar;
  },
};

export default mutations;
