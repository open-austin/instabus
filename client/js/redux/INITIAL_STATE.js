import Immutable from 'immutable';

const state = {
  data: {
    tripsForLocation: [],
    stopsForLocation: [],
    tripsForRoute: [],
    agencies: {
      'disclaimer': '',
      'id': '1',
      'lang': 'en',
      'name': 'Capital Metro',
      'phone': '512-474-1200',
      'privateService': false,
      'timezone': 'America/Chicago',
      'url': 'http://www.capmetro.org/'
    },
    routes: {},
    situations: {},
    stops: {},
    trips: {},
  },
  ui: {
    page: 'ROUTE_LIST',
    tab: 'All',
    agency: '1',
    currentRoute: null,
    stop: null,
    vehicle: null,
    errorMessage: null,
    userLatLng: null,
    tripsForLocationLoading: false,
    tripsForRouteLoading: false,
  },
};

export default Immutable.fromJS(state);
