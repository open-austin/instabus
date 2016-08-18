import { createHashHistory } from 'history';
import uniloc from 'uniloc';

export const GlobalHistory = createHashHistory({
  queryKey: '',
});

export const Router = uniloc(
  {
    routes: 'GET /',
    saved: 'GET /saved',
    route: 'GET /:routeId',
    direction: 'GET /route/:routeId/:routeDirection',
    stop: 'GET /stop/:stopId',
    stopForRoute: 'GET /stop/:stopId/for/:routeId',
  },
);
