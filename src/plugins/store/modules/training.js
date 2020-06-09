export default {
  namespaced: true,

  state: () => ({
    step: -1
  }),

  mutations: {
    INCREMENT(state) {
      state.step += 1;
    },

    RESET(state) {
      state.step = -1;
    },

    START(state) {
      state.step = 0;
    }
  },

  actions: {
    increment(context) {
      context.commit('INCREMENT');
    },

    reset(context) {
      context.commit('RESET');
    },

    start(context) {
      context.commit('START');
    },
  },

  getters: {
    step: state => state.step
  }
}