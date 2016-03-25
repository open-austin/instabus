import _ from 'lodash';
import { createSelector } from 'reselect';

export const sortedRoutesSelector = createSelector(
  (state) => state.oba.references.routes,
  (routes) => _.sortBy(routes, ['shortName'])
);

export const currentRouteSelector = createSelector(
  (state) => state.oba.references.routes,
  (state) => state.currentRoute,
  (allRoutes, currentRoute) => allRoutes[currentRoute]
);

export const stopGroupsForCurrentRouteSelector = createSelector(
  (state) => state.oba.stopGroups,
  (state) => state.currentRoute,
  (stopGroups, currentRoute) => _.sortBy(stopGroups[currentRoute], 'id') || [],
);

export const stopGroupSelector = createSelector(
  stopGroupsForCurrentRouteSelector,
  (state, props) => props.stopGroupId,
  (stopGroups, stopGroupId) => stopGroups[stopGroupId]
);

export const stopSelector = createSelector(
  (state) => state.oba.references.stops,
  (state, props) => props.stopId,
  (stops, stopId) => stops[stopId]
);
