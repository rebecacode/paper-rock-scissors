import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/board',
    name: 'board',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "BoardPage" */ '../views/BoardPage.vue'),
    children: [
      {
        path: 'classic',
        name: 'board-classic',
        component: () => import(/* webpackChunkName: "OptionsClassic" */ '../components/OptionsClassic.vue'),
      },
      {
        path: 'classic/game',
        name: 'classic-game',
        component: () => import(/* webpackChunkName: "BoardGame" */ '../components/BoardGame.vue'),
      },
      {
        path: 'bonus',
        name: 'board-bonus',
        component: () => import(/* webpackChunkName: "OptionsBonus" */ '../components/OptionsBonus.vue'),
      },
      {
        path: 'bonus/game',
        name: 'bonus-game',
        component: () => import(/* webpackChunkName: "BoardGame" */ '../components/BoardGame.vue'),
      },
      {
        path: '',
        redirect: 'classic',
      },
    ],
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    // Scroll to the top of the page on route navigation
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
