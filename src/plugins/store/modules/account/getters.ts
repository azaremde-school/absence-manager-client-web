import { GetterTree } from 'vuex';
import IAccountStore from './account-store';
import IRootState from '../../root-state';

const getters: GetterTree<IAccountStore, IRootState> = {
  token: state => state.token,
  session: state => state.session,
  auth: state => !!state._id && !!state.token && !!state.session,
}

export default getters;