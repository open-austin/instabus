import _ from 'lodash';
import { createSelector } from 'reselect';

export const stopListSelector = createSelector(
  (state) => state.stops.stopList.stopsForRoute[state.stops.stopList.selectedRoute],
  (stops) => _.sortBy(stops, ['id'])
);
