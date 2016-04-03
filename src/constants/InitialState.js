export default {
  routing: {
    tab: null,
    routeId: null,
    stopGroupId: null,
    stopId: null,
  },
  ui: {
    currentAgency: '1',
    userLocationError: null,
    globalError: null,
    map: {
      lat: null,
      lon: null,
      latSpan: 0.03500879999999995 / 10,
      lonSpan: 0.0889021999999926 / 10,
    },
    loading: {
      routesForAgencyLoading: false,
      nearbyTripsLoading: false,
      stopsForRouteLoading: false,
      vehiclesLoading: false,
    },
    recent: [
      { type: 'route', id: '1_801' },
      { type: 'stop', id: '1_2606' },
    ],
  },
  oba: {
    vehicles: {},
    stopsForLocation: {},
    arrivalsAndDepartures: {},
    stopGroups: {},
    references: {
      agencies: {
        1: {
          disclaimer: '',
          id: '1',
          lang: 'en',
          name: 'Capital Metro',
          phone: '512-474-1200',
          privateService: false,
          timezone: 'America/Chicago',
          url: 'http://www.capmetro.org/',
        },
      },
      routes: {
        '1_801': {
          agencyId: '1',
          color: 'E11F8F',
          description: '',
          id: '1_801',
          longName: 'N Lamar S Congress',
          shortName: '801',
          textColor: '000000',
          type: 3,
          url: '',
        },
      },
      stops: {},
      trips: {
        '1_1538496': {
          blockId: '1_556090',
          directionId: '1',
          id: '1_1538496',
          routeId: '1_20',
          routeShortName: '',
          serviceId: '1_105-5',
          shapeId: '1_34643',
          timeZone: '',
          tripHeadsign: '20-Manor Rd/Riverside-SB',
          tripShortName: '',
        },
      },
      situations: {},
    },
  },
};
