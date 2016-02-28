export default {
  data: {
    tripsForLocation: [],
    tripsDetailsForRoute: {},
    agencies: {
      disclaimer: '',
      id: '1',
      lang: 'en',
      name: 'Capital Metro',
      phone: '512-474-1200',
      privateService: false,
      timezone: 'America/Chicago',
      url: 'http://www.capmetro.org/',
    },
    routes: {},
    stops: {},
    trips: {},
    shapes: {},
  },
  ui: {
    page: 'ROUTE_LIST',
    agency: '1',
    currentRoute: null,
    errorMessage: null,
    userLatLng: null,
    tripsForLocationLoading: false,
    tripsDetailsForRouteLoading: false,
  },
};
