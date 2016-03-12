export default {
  selectedAgencyID: 1,
  userLocation: null,
  userLocationError: null,
  routes: {
    allRoutes: {},
    allRoutesLoading: false,
  },
  trips: {
    nearby: {
      nearbyTrips: {},
      nearbyTripsLoading: false,
    },
  },
  stops: {
    stopList: {
      selectedRoute: '',
      stopsForRoute: {},
      stopsForRouteLoading: false,
    },
  },
  history: {
    history: {},
  },
};
