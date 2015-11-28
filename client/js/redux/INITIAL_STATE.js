import Immutable from 'immutable';

const state = {
  data: {
    tripsForLocation: [],
    stopsForLocation: [],
    tripsForRoute: [],
    agencies: {},
    routes: {},
    situations: {},
    stops: {},
    trips: {},
  },
  ui: {
    page: 'Routes',
    tab: 'All',
    agency: null,
    route: null,
    stop: null,
    vehicle: null,
    errorMessage: null,
    userLatLng: [28.058091, -82.417872],
    tripsForLocationLoading: false,
    tripsForRouteLoading: false,
  },
};

export default Immutable.fromJS(state);
