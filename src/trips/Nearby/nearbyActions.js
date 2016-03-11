import _ from 'lodash';

import oba from 'libs/oba';

export const SET_NEARBY_TRIPS = 'instabus/trips/SET_NEARBY_TRIPS';
export const SET_NEARBY_TRIPS_LOADING = 'instabus/trips/SET_NEARBY_TRIPS_LOADING';


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

    return oba('routes-for-location', query)
      .then(data => {
        const tripsById = _.keyBy((data.data.list), 'id');
        console.log(tripsById);
        dispatch(setNearbyTrips(tripsById));
      })
      .catch((err) => console.error(err))
      .then(() => {
        dispatch(setNearbyTripsLoading(false));
      });
  };
}
