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
      saved: false,
      stops: false,
    },
  },
  data: {
    routes: {
      orderedRoutes: [],
      routesById: {},
    },
    stopGroups: {},
    vehicles: {
      allVehicles: [],
      vehiclesByRoute: {},
    },
    saved: {
      savedRoutes: [],
    },
  },
};
