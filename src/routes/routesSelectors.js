import _ from 'lodash';
import { createSelector } from 'reselect';

export const sortedRoutesSelector = createSelector(
  (state) => state.routes.allRoutes,
  (routes) => _.sortBy(routes, ['shortName'])
);
