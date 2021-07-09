import routerConfig from '../../configs/routerConfig';
import tokenHelper from '../../helpers/tokenHelper';

export default function auth({
  next, store, from,
}) {
  if (tokenHelper.check() && store.state.auth.isLogined) {
    next();
    return;
  }
  if (from.path === routerConfig.Auth) {
    return;
  }
  next(routerConfig.Auth);
}
