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
      active: false,
      routes: false,
      route: false,
      stop: false,
      stopFor: false,
    },
    modal: {
      routes: false,
      saved: false,
      stops: false,
    },
  },
  data: {
    vehicles: {
      active: [],
      id: {},
      route: {},
    },
    stops: {
      active: [],
      id: {},
      route: {},
    },
    shapes: {
      active: [],
      route: {},
    },
    saved: {
      savedRoutes: [],
    },
  },
};
