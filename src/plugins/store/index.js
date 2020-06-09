import Vue from 'vue';
import Vuex from 'vuex';

import http from './modules/http';
import ui from './modules/ui';
import calendar from './modules/calendar';
import data from './modules/data';
import account from './modules/account';
import groups from './modules/groups';
import training from './modules/training';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    http,
    ui,
    calendar,
    data,
    account,
    groups,
    training
  },
});
