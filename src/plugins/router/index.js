import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store/index';
import axios from 'axios';

Vue.use(VueRouter);

/**
 * Lazy loading only.
 */
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/pages/Main.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/pages/Signup.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

/**
 * Checking authentication before entering each route.
 */
router.beforeEach((to, from, next) => {
  const stopChecking = store.getters['account/stopChecking'];

  /**
   * If we don't want to check the authentication,
   * we just let client go.
   */
  if (stopChecking) {
    next();
    return;
  };

  const authNeeded = to.name === 'Main';

  const url = store.getters['http/url'];
  const token = store.getters['account/token'];
  
  axios.get(`${url}/account/check_auth`, {
    params: {
      token
    }
  }).then(result => {
    const success = !!result.data;

    next({
      name: 
        authNeeded 
        ? (success 
          ? undefined
          : 'Login') 
        : (success 
          ? 'Main' 
          : undefined)
    });

    return;
  });

  next();
});

export default router;
