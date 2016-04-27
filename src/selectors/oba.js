import _ from 'lodash';
import { createSelector } from 'reselect';

import {
  ROUTE,
  DIRECTION,
} from 'constants';

export const stopGroupSelector = createSelector(
  (state) => state.ui.route.options.routeId,
  (state) => state.data.stopGroups,
  (routeId, stopGroups) => stopGroups[routeId],
);

export const vehiclesSelector = createSelector(
  (state) => state.data.vehicles,
  (state) => state.ui.route,
  (vehicles, route) => {
    const showStops = (route.name === ROUTE) || (route.name === DIRECTION);
    if (showStops) {
      return vehicles.vehiclesByRoute[route.options.routeId] || [];
    }

    return vehicles.allVehicles;
  }
);

export const polylineSelector = createSelector(
  (state) => state.data.stopGroups,
  (state) => state.ui.route,
  (stopGroups, route) => {
    if (route.name === ROUTE && stopGroups[route.options.routeId]) {
      const direction = stopGroups[route.options.routeId].directions[0];
      const polyline = stopGroups[route.options.routeId].groups[direction].polyline;
      return polyline;
    }
    else if (route.name === DIRECTION && stopGroups[route.options.routeId]) {
      const polyline = stopGroups[route.options.routeId].groups[route.options.routeDirection].polyline;
      return polyline;
    }

    return null;
  }
);

export const stopsSelector = createSelector(
  (state) => state.data.stopGroups,
  (state) => state.ui.route,
  (stopGroups, route) => {
    if (route.name === ROUTE && stopGroups[route.options.routeId]) {
      const direction = stopGroups[route.options.routeId].directions[0];
      const polyline = stopGroups[route.options.routeId].groups[direction].stops;
      return polyline;
    }
    else if (route.name === DIRECTION && stopGroups[route.options.routeId]) {
      const polyline = stopGroups[route.options.routeId].groups[route.options.routeDirection].stops;
      return polyline;
    }

    return null;
  }
);
