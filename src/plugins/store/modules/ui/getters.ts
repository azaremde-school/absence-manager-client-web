import { GetterTree } from 'vuex';
import IUIStore from './ui-store';
import IRootState from '../../root-state';

const getters: GetterTree<IUIStore, IRootState> = {
  sidebar: state => state.sidebar,
  dev: () => true
}

export default getters;