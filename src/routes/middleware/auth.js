import routerConfig from '../../configs/routerConfig';

export default function auth({
  next, store, from,
}) {
  if (store.state.auth.isLogined) {
    next();
    return;
  }
  if (from.path === routerConfig.Auth) {
    return;
  }
  next(routerConfig.Auth);
}
