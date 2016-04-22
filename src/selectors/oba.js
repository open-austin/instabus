import _ from 'lodash';
import { createSelector } from 'reselect';

import {
  ROUTE,
  DIRECTION,
} from 'constants';

export const sortedRoutesSelector = createSelector(
  (state) => state.data.routes,
  (routes) => _.sortBy(routes, (o) => parseInt(o.shortName, 10))
);

export const stopGroupSelector = createSelector(
  (state) => state.ui.route.options.routeId,
  (state) => state.data.stops,
  (routeId, stops) => stops[routeId],
);

export const vehiclesSelector = createSelector(
  (state) => state.data.vehicles,
  (state) => state.ui.route,
  (vehicles, route) => {
    const showStops = (route.name === ROUTE) || (route.name === DIRECTION);
    if (showStops) {
      const vehicle = vehicles[route.options.routeId];
      return vehicle ? _.map(vehicles[route.options.routeId].trips, v => v) : [];
    }

    let allBuses = [];
    _.forEach(vehicles, (vehicle) => {
      allBuses = allBuses.concat(_.map(vehicle.trips, trip => trip));
    });
    return allBuses;
  }
);

export const polylineSelector = createSelector(
  (state) => state.data.stops,
  (state) => state.ui.route,
  (stops, route) => {
    const showStops = (route.name === ROUTE) || (route.name === DIRECTION);
    if (showStops && stops[route.options.routeId]) {
      const polyline = stops[route.options.routeId][0].polyline;
      return polyline;
    }

    return null;
  }
);

export const stopsSelector = createSelector(
  (state) => state.data.stops,
  (state) => state.ui.route,
  (stops, route) => {
    const showStops = (route.name === ROUTE) || (route.name === DIRECTION);
    if (showStops && stops[route.options.routeId]) {
      return stops[route.options.routeId][0].stops;
    }

    return null;
  }
);
