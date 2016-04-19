import { GlobalHistory } from 'libs/routing';
import { SET_PATHNAME } from 'constants/ActionTypes';

export function setPathname(payload) {
  return {
    type: SET_PATHNAME,
    payload,
  };
}

export function setupRouter(store) {
  GlobalHistory.listen((location) => {
    store.dispatch(setPathname(location.pathname));
  });
}
