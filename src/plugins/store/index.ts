import Vue from 'vue';
import Vuex from 'vuex';
import ui from './modules/ui/ui';
import account from './modules/account/account';
import logic from './modules/logic/logic';
import calendar from './modules/calendar/calendar';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ui,
    account,
    logic,
    calendar,
  },
});
