import Vue from 'vue';
import App from './App.vue';

import router from './plugins/router/index';
import store from './plugins/store/index';
import vuetify from './plugins/vuetify/index';
import burst from './plugins/burst/index';

Vue.config.productionTip = false;

Vue.use(burst, {
  store,
  url: process.env.VUE_APP_SERVER_URL,
  authAction: 'account/setAuthentication'
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
