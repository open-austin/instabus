import _ from 'lodash';
import { createSelector } from 'reselect';
import { stopGroupsForCurrentRouteSelector } from 'selectors/oba';


export const vehiclesArraySelector = createSelector(
  (state) => state.oba.vehicles,
  (vehicles) => _.toArray(vehicles),
);

export const vehiclesSelector = createSelector(
  (state) => state.ui.currentRoute,
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
  (state) => state.ui.currentRoute,
  flattenedStopGroupsSelector,
  (routeId, stopGroups) => stopGroups.reduce((prev, stopGroup) => [
    ...prev, ...stopGroup.stopIds,
  ], [])
);

export const polylinesSelector = createSelector(
  (state) => state.ui.currentRoute,
  flattenedStopGroupsSelector,
  (routeId, stopGroups) => stopGroups.reduce((prev, stopGroup) => [
    ...prev, ...stopGroup.polylines,
  ], [])
);
