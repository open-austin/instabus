import _ from 'lodash';
import { createSelector } from 'reselect';

export const nearbyTripsSelector = createSelector(
  (state) => state.trips.nearby.nearbyTrips,
  (trips) => _.sortBy(trips, ['id'])
);
