export default {
  ui: {
    globalError: null,
    route: {
      name: 'routes',
      options: {},
    },
    userLocation: null,
    activeVehicles: [],
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
    selectedTrip: null,
    active: {
      vehicles: {},
      shapes: {},
      stops: {},
    },
  },
  data: {
    routes: {}, // keyed by route_id
    vehicles: {}, // keyed by trip_id
    stops: {}, // keyed by stop_id
    stopLists: {}, // keyed by trip_id
    shapes: {}, // keyed by shape_id
    trips: {}, // keyed by trip_id
  },
};

/*

  route: {
    routeId: {
      id,
      name,
    }
  }

  trips: {
    trip_id: {
      id,
      headsign,
      shapeId,
      direction,
      routeId,
    }
  }

  shapes: {
    shapeId,
    decodedLine,
  }

  stops: {
    stop_id: {
      id,
      name,
      lat,
      lon,
      schedule: {
        date: {
          direction: []
        }
      }
    }
  }

  vehicles: {
    vehicle_id: {
      id,
      trip,
      lat,
      lon,
      timestamp,
    }
  }

*/
