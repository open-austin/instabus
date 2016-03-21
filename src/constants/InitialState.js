export default {
  currentAgencyID: 1,
  currentRoute: null,
  currentTrip: null,
  userLocation: null,
  userLocationError: null,
  routes: {
    allRoutes: {},
    allRoutesLoading: false,
  },
  trips: {
    nearbyTrips: {},
    nearbyTripsLoading: false,
  },
  stops: {
    stopsForRouteLoading: false,
  },
  history: {
    history: {},
  },
};
