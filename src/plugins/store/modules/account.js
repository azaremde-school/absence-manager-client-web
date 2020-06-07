import router from "../../router";

export default {
  namespaced: true,

  state: () => ({
    stopChecking: false
  }),

  mutations: {
    SET_TOKEN(state, value) {
      localStorage.setItem('token', value);

      /**
       * We prevent the router from checking
       * whether the client is authorized.
       */
      state.stopChecking = true;

      router.push({
        name: 'Main'
      })

      /**
       * And again let it check the authorization.
       */
      state.stopChecking = false;
    },
    
    LOG_OUT(state) {
      localStorage.removeItem('token');

      state.stopChecking = true;

      router.push({
        name: 'Login'
      })

      state.stopChecking = false;
    },

    SET_STOP_CHECKING(state, value) {
      state.stopChecking = value;
    }
  },

  actions: {
    setToken(context, value) {
      context.commit('SET_TOKEN', value);
    },

    logOut(context) {
      context.commit('LOG_OUT');
    },

    setStopChecking(context, value) {
      context.commit('SET_STOP_CHECKING', value);
    }
  },

  getters: {
    token: () => localStorage.getItem('token'),
    stopChecking: state => state.stopChecking
  }
}