import { createHashHistory } from 'history';
import uniloc from 'uniloc';

export const GlobalHistory = createHashHistory({
  queryKey: false,
});

export const Router = uniloc(
  {
    routes: 'GET /',
    saved: 'GET /saved',
    route: 'GET /route/:routeId',
    direction: 'GET /route/:routeId/:routeDirection',
  },
);
