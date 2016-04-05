import _ from 'lodash';
import { createSelector } from 'reselect';
import polyline from 'polyline';

import { stopGroupsForCurrentRouteSelector } from 'selectors/oba';

export const vehiclesArraySelector = createSelector(
  (state) => state.oba.vehicles,
  (vehicles) => _.toArray(vehicles),
);

export const vehiclesSelector = createSelector(
  (state) => state.routing.routeId,
  vehiclesArraySelector,
  (state) => state.oba.references.trips,
  (routeId, vehicles, trips) => {
    if (routeId) {
      return vehicles.filter(
        (vehicle) => vehicle.tripId && trips[vehicle.tripId].routeId === routeId
      );
    }
    return vehicles;
  }
);

export const flattenedStopGroupsSelector = createSelector(
  stopGroupsForCurrentRouteSelector,
  (stopGroups) => _.values(stopGroups)
);

export const stopIdsSelector = createSelector(
  (state) => state.routing.routeId,
  flattenedStopGroupsSelector,
  (routeId, stopGroups) => stopGroups.reduce((prev, stopGroup) => [
    ...prev, ...stopGroup.stopIds,
  ], [])
);

export const rawPolylinesSelector = createSelector(
  (state) => state.routing.routeId,
  flattenedStopGroupsSelector,
  (routeId, stopGroups) => stopGroups.reduce((prev, stopGroup) => [
    ...prev, ...stopGroup.polylines,
  ], [])
);

export const polylinesSelector = createSelector(
  rawPolylinesSelector,
  (polylines) => polylines.map(shape => polyline.decode(shape.points))
);
