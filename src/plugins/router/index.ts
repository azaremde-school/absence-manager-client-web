import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/pages/main/main.component.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/login.component.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '@/pages/signup/signup.component.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'main') {
    if (!store.getters['account/auth']) {
      next({ path: '/login' });
    }
  }
  
  next();
});

export default router;
