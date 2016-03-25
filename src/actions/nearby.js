import _ from 'lodash';

import oba from 'libs/oba';

import {
  SET_NEARBY_TRIPS,
  SET_NEARBY_TRIPS_LOADING,
} from 'constants/ActionTypes';

export function setNearbyTrips(payload) {
  return {
    type: SET_NEARBY_TRIPS,
    payload,
  };
}

export function setNearbyTripsLoading(payload) {
  return {
    type: SET_NEARBY_TRIPS_LOADING,
    payload,
  };
}

export function getNearbyTrips(userLocation) {
  return (dispatch) => {
    dispatch(setNearbyTripsLoading(true));

    const query = {
      lat: userLocation.lat,
      lon: userLocation.lon,
      // FIXME: Not sure what these values should be
      // So I'm using radius instaed
      // latSpan: 100,
      // lonSpan: 100,
      radius: 3000,
      includeStatus: true,
      includeSchedule: true,
    };

    return oba('trips-for-location', query)
      .then(data => {
        const tripsById = _.keyBy((data.data.list), 'tripId');
        dispatch(setNearbyTrips(tripsById));
      })
      .catch((err) => console.error(err))
      .then(() => {
        dispatch(setNearbyTripsLoading(false));
      });
  };
}
