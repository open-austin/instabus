export default {
  data: {
    tripsForLocation: [],
    agencies: {},
    routes: {},
    situations: {},
    stops: {},
    trips: {},
  },
  ui: {
    page: 'App',
    tab: 'arrivals',
    agency: null,
    route: null,
    stop: null,
    vehicle: null,
    error: null,
    userLocation: [28.058091, -82.417872],
    tripsForLocation: {
      loading: false,
      tripIDs: [],
    },
  },
};
