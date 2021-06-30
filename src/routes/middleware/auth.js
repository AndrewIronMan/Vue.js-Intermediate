import routerConfig from '../../configs/routerConfig';

export default function auth({
  next, store, to, from,
}) {
  if (store.state.auth.isLogined && to !== from) {
    next();
    return;
  }
  if (from.path === routerConfig.Auth) {
    return;
  }
  next(routerConfig.Auth);
}
