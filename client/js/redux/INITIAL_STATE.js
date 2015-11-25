import Immutable from 'immutable';

const state = {
  data: {
    tripsForLocation: [],
    stopsForLocation: [],
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
    errorMessage: null,
    userLocation: [28.058091, -82.417872],
    tripsForLocation: {
      loading: false,
      tripIDs: [],
    },
  },
};

export default Immutable.fromJS(state);
