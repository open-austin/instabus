export default {
  ui: {
    globalError: null,
    currentAgency: 1,
    route: {
      name: 'routes',
      options: {},
    },
    userLocation: null,
    initialVehiclesLoaded: false,
    loading: {
      routes: false,
      vehicles: false,
      stops: false,
    },
    modal: {
      routes: false,
      favorites: false,
      stops: false,
    },
  },
  data: {
    routes: [],
    stopGroups: {},
    vehicles: {
      allVehicles: [],
      vehiclesByRoute: {},
    },
  },
};
