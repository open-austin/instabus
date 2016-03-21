import _ from 'lodash';

import { createSelector } from 'reselect';

export const sortedRoutesSelector = createSelector(
  (state) => state.oba.references.routes,
  (routes) => _.sortBy(routes, ['shortName'])
);
