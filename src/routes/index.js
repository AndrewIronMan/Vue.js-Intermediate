import routerConfig from '../configs/routerConfig';
import auth from './middleware/auth';
import store from '../store/modules/index';


const routes = [
  {
    path: routerConfig.Home,
    name: 'Home',
    component: () => import('../views/static/Home.vue'),
  },
  {
    path: `${routerConfig.Posts}/:userId`,
    name: 'Posts',
    component: () => import('../views/posts/Posts.vue'),
    props: true,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: `${routerConfig.Post}/:id`,
    name: 'Post',
    component: () => import('../views/posts/Post.vue'),
    props: true,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: routerConfig.Auth,
    name: 'Auth',
    component: () => import('../views/auth/Auth.vue'),
  },
  {
    path: routerConfig.Logout,
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('auth/logout');
      next();
    },
  },
  {
    path: routerConfig.NotFound,
    name: 'NotFound',
    component: () => import('../views/static/NotFound.vue'),
  },
];


export default routes;
