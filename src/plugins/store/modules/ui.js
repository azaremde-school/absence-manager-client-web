export default {
  namespaced: true,

  state: () => ({
    sidebar: false,
    tab: 0
  }),

  mutations: {
    SHOW_SIDEBAR(state, value) {
      state.sidebar = value;
    },

    SET_TAB(state, value) {
      state.tab = value;
    },
  },

  actions: {
    showSidebar(context, value) {
      context.commit('SHOW_SIDEBAR', value);
    },

    setTab(context, value) {
      context.commit('SET_TAB', value);
    }
  },

  getters: {
    sidebar: state => state.sidebar,
    tab: state => state.tab
  }
}