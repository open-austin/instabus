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
    page: 'Nearby',
    tab: 'All',
    agency: null,
    route: null,
    stop: null,
    vehicle: null,
    errorMessage: null,
    userLatLng: null,
    tripsForLocationLoading: false,
    tripsForRouteLoading: false,
  },
};

export default Immutable.fromJS(state);
