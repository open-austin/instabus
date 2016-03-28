import {
  SET_REFERENCES,
} from 'constants/ActionTypes';

export function setReferences(payload) {
  return {
    type: SET_REFERENCES,
    payload,
  };
}


// FIXME: Instead of splitting up the dispatches
// Just dispatch SET_REFERENCES
// And let the reducers do the work
//
// export function setReferences(references) {
//   return (dispatch) => {
//     const routes = _.keyBy((references.routes), 'id');
//     dispatch(setRoutes(routes));
//
//     const agencies = _.keyBy((references.agencies), 'id');
//     dispatch(setRoutes(agencies));
//
//     const trips = _.keyBy((references.trips), 'id');
//     dispatch(setTrips(trips));
//
//     const stops = _.keyBy((references.stops), 'id');
//     dispatch(setStops(stops));
//
//     const situations = _.keyBy((references.situations), 'id');
//     dispatch(setStops(stops));
//   };
// }
