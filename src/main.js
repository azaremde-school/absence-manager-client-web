import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router/index';
import store from './plugins/store/index';
import vuetify from './plugins/vuetify/index';

import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
