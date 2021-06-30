import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import routes from './routes';
import store from './store/modules';
import middlewarePipeline from './routes/middlewarePipeline';

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes,
});
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const { middleware } = to.meta;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});


Vue.use(VueRouter);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
