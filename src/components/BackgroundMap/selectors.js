import _ from 'lodash';
import { createSelector } from 'reselect';
import { currentStopGroupSelector } from 'selectors/oba';


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

export const flattenedStopGroupSelector = createSelector(
  currentStopGroupSelector,
  (stopGroups) => _.values(stopGroups)
);

export const stopsSelector = createSelector(
  (state) => state.ui.currentRoute,
  flattenedStopGroupSelector,
  (routeId, stopGroups) => {
    return stopGroups.reduce((prev, stopGroup) => [
      ...prev, ...stopGroup.stopIds,
    ], []);
  }
);

export const polylinesSelector = createSelector(
  (state) => state.ui.currentRoute,
  flattenedStopGroupSelector,
  (routeId, stopGroups) => {
    return stopGroups.reduce((prev, stopGroup) => [
      ...prev, ...stopGroup.polylines,
    ], []);
  }
);
