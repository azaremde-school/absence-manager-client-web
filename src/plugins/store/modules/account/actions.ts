import { ActionTree } from 'vuex';
import IAccountStore from './account-store';
import IRootState from '../../root-state';

const actions: ActionTree<IAccountStore, IRootState> = {
  setAuthentication(context, value) {
    context.commit('SET_AUTHENTICATION', value);
  },

  setId(context, _id: number) {
    context.commit('SET_ID', _id);
  },

  setToken(context, token: string) {
    context.commit('SET_TOKEN', token);
  },

  setSession(context, session: string) {
    context.commit('SET_SESSION', session);
  },

  logOut(context) {
    context.commit('LOG_OUT');
  }
};

export default actions;
