import { createHashHistory } from 'history';
import uniloc from 'uniloc';

export const GlobalHistory = createHashHistory({
  queryKey: false,
});

export const Router = uniloc(
  {
    routes: 'GET /',
    favorites: 'GET /favorites',
    route: 'GET /route/:routeId',
    direction: 'GET /route/:routeId/:routeDirection',
  },
);
