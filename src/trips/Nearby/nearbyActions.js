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

export function getNearbyTrips(payload) {
  return (dispatch) => {
    dispatch(setNearbyTripsLoading(true));

    // add getState to => arguments
    // const state = getState();
    // const location = state.userLocation;
    const query = {
      lat: payload.location.lat,
      lon: payload.location.lon,
      latSpan: payload.span.lat,
      lonSpan: payload.span.lon,
    };

    return oba(`routes-for-location/${query}`)
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
