import { MutationTree } from 'vuex';
import IAccountStore from './account-store';
import router from '@/plugins/router';

const mutations: MutationTree<IAccountStore> = {
  SET_AUTHENTICATION(state, value) {
    state.auth = value;
  },

  SET_ID(state, _id: number) {
    state._id = _id;
    localStorage.setItem('_id', _id.toString());
  },

  SET_TOKEN(state, token: string) {
    state.token = token;
    localStorage.setItem('token', token);
  },

  SET_SESSION(state, session: string) {
    state.session = session;
    localStorage.setItem('session', session);
  },

  LOG_OUT(state) {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('session');

    state.auth = false;
    router.replace({ name: 'login' });
  }
};

export default mutations;
