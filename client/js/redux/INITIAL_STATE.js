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
    page: 'Routes',
    tab: 'All',
    agency: null,
    route: 'Hillsborough Area Regional Transit_6',
    stop: null,
    vehicle: null,
    errorMessage: null,
    userLatLng: [28.058091, -82.417872],
    tripsForLocation: {
      loading: false,
      tripIDs: [],
    },
  },
};

export default Immutable.fromJS(state);
