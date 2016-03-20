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
    stopsForRoute: {},
    stopsForRouteLoading: false,
  },
  history: {
    history: {},
  },
};
