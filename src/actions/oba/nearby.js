import _ from 'lodash';

import oba from 'libs/oba';

import { handleError } from 'actions/oba';
import { setReferences } from 'actions/oba/references';
import {
  SET_STOPS_FOR_LOCATION,
  SET_NEARBY_TRIPS_LOADING,
  SET_ARRIVALS_AND_DEPARTURES,
} from 'constants/ActionTypes';

export function setNearbyTripsLoading(payload) {
  return {
    type: SET_NEARBY_TRIPS_LOADING,
    payload,
  };
}

export function setStopsForLocation(location, payload) {
  return {
    type: SET_STOPS_FOR_LOCATION,
    payload: { location, payload },
  };
}

export function setArrivalsAndDepartures(stopId, payload) {
  return {
    type: SET_ARRIVALS_AND_DEPARTURES,
    payload: { stopId, payload },
  };
}

export function getArrivalsAndDeparturesForStop(stop) {
  return (dispatch) => {
    const stopId = stop.id;
    const query = {
      minutesBefore: 100,
      minutesAfter: 300,
    };

    return oba(`arrivals-and-departures-for-stop/${stopId}`, query)
      .then((json) => {
        setReferences(json.data.references)(dispatch);

        dispatch(setArrivalsAndDepartures(stopId, json.data.entry.arrivalsAndDepartures));
      });
  };
}

// FIXME: Open an issue on the OneBusAway repo demonstrating that ?time is ignored.

// OneBusAway has a /trips-for-location endpoint.
// Unfortunately it only returns the active trips.
// It doesn't return inactive upcoming trips.
// This means we wont get a trip that will start in 15 minutes.
// But, /trips-for-location does have a time parameter.
// We could call /trips-for-location with ?time=(now + offset)
// to get these inactive upcoming trips.
// Unfortunately, the time param doesn't work!
// So, the shitty work around is to:
// Call /stops-for-location
// For each stop:
//   /arrivals-and-departures-for-stop
//     ?minutesBefore=100
//     ?minutesAfter=300
// This is terrible. I imagine we will have to set up a proxy
// server to make these requests so we don't waste users bandwidth.
export function getNearbyTrips() {
  return (dispatch, getState) => {
    dispatch(setNearbyTripsLoading(true));
    // FIXME: We could do some optimization here and check that we
    // don't already have data for this location. Specifically,
    // check if the bounds fit in a previous bounding box.

    const { lat, lon, latSpan, lonSpan } = getState().ui.map;
    const location = { lat, lon, latSpan, lonSpan };
    const query = { ...location };

    return oba('stops-for-location', query)
      .then(json => {
        setReferences(json.data.references)(dispatch);

        const stops = json.data.list;
        dispatch(setStopsForLocation(location, _.keyBy(stops, 'id')));

        // const promises = stops.map((stop) => getArrivalsAndDeparturesForStop(stop)(dispatch, getState));
        //
        // return Promise.all(promises);
      })
      // .catch((err) => handleError(dispatch, err))
      .then(() => {
        dispatch(setNearbyTripsLoading(false));
      });
  };
}

// arrivals-and-departures-for-stop/1_857.json?key=TEST&minutesBefore=100&minutesAfter=300
