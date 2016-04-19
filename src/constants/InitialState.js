export default {
  ui: {
    globalError: null,
    route: {
      name: 'routes',
      options: {},
      hash: '',
    },
    userLocation: null,
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
    routes: {},
    stops: {},
    vehicles: {},
  },
};
