import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/src/pages/home.vue'),
  },
];

export default createRouter({
  history: createWebHistory('/'),
  routes,
});
