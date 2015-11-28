export function joinTrip(state, tripId) {
  const trip = state.getIn(['data', 'trips', tripId]);

  if (!trip) {
    return {trip, route: null};
  }

  const routeId = trip.get('routeId');
  const route = state.getIn(['data', 'routes', routeId]);

  return {trip, route};
}

export function joinStop(state, stopId) {
}
