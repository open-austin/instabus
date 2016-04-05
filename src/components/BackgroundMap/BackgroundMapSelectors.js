import _ from 'lodash';
import { createSelector } from 'reselect';
import polyline from 'polyline';
import {
  latLng,
} from 'leaflet';

import { stopGroupsForCurrentRouteSelector } from 'selectors/oba';

export const vehiclesArraySelector = createSelector(
  (state) => state.oba.vehicles,
  (vehicles) => _.toArray(vehicles),
);

export const vehiclesSelector = createSelector(
  (state) => state.routing.routeId,
  vehiclesArraySelector,
  (state) => state.oba.references.trips,
  (state) => state.ui.map.bounds,
  (routeId, vehicles, trips, bounds) => {
    if (!bounds) return [];
    if (routeId) {
      return vehicles.filter(
        (vehicle) => vehicle.tripId && trips[vehicle.tripId].routeId === routeId
      );
    }
    return vehicles.filter(
      (vehicle) => {
        if (!vehicle.location) return false;
        const p = latLng(vehicle.location.lat, vehicle.location.lon);
        return bounds.contains(p);
      }
    );
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
