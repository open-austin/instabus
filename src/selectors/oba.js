import _ from 'lodash';
import { createSelector } from 'reselect';

import { keyForLocation } from 'libs/oba';

export const sortedRoutesSelector = createSelector(
  (state) => state.oba.references.routes,
  (routes) => _.sortBy(routes, (o) => parseInt(o.shortName, 10))
);

export const currentRouteSelector = createSelector(
  (state) => state.oba.references.routes,
  (state) => state.routing.routeId,
  (allRoutes, currentRoute) => allRoutes[currentRoute]
);

export const stopGroupsForCurrentRouteSelector = createSelector(
  (state) => state.oba.stopGroups,
  (state) => state.routing.routeId,
  (stopGroups, routeId) => _.sortBy(stopGroups[routeId], 'id') || [],
);

export const stopsInMapSelector = createSelector(
  (state) => keyForLocation(state.ui.map),
  (state) => state.oba.stopsForLocation,
  (locationKey, stopsForLocation) => _.sortBy(stopsForLocation[locationKey], 'id')
);

export const arrivalsInMapSelector = createSelector(
  stopsInMapSelector,
  (state) => state.oba.arrivalsAndDepartures,
  (stops, arrivalsAndDepartures) => stops.reduce((prev, stop) => [
    ...prev,
    ...(arrivalsAndDepartures[stop.id] || []),
  ], [])
);
