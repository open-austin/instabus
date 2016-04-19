import { createHistory } from 'history';
import uniloc from 'uniloc';

export const GlobalHistory = createHistory();

export const Router = uniloc(
  {
    routes: 'GET /',
    favorites: 'GET /favorites',
    route: 'GET /route/:routeId',
  },
);
