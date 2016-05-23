import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import polyline from 'polyline';

import vehiclesResponse from './vehiclesResponse.json';

const lambda = 'https://xlvm3rjs2b.execute-api.us-east-1.amazonaws.com/latest/';

const getVehicles1 = (e) => {
  const {
    allVehicles,
    shapes: activeShapes,
    stops: activeStops,
  } = vehiclesResponse;
  const vehiclesById = _.keyBy(allVehicles, 'vehicleId');
  const vehiclesByRoute = _(allVehicles)
    .groupBy('route.id')
    .value();
  const vehicles = {
    active: allVehicles,
    route: vehiclesByRoute,
    id: vehiclesById,
  };
  const decodedShapes = activeShapes.map((shape) => ({
    ...shape,
    points: polyline.decode(shape.points),
  }));
  const shapes = {
    active: decodedShapes,
    route: {},
  };
  const stops = {
    active: activeStops,
    route: {},
    id: {},
  };
  const message = {
    type: e.type,
    requestId: e.requestId,
    vehicles,
    shapes,
    stops,
  };
  self.postMessage(message);
};

const getVehicles = (e) => {
  fetch(`${lambda}vehicles-for-agency/${e.agencyId}`)
    .then(response => response.json())
    .then((json) => {
      const {
        allVehicles,
        shapes: activeShapes,
        stops: activeStops,
      } = vehiclesResponse;
      const vehiclesById = _.keyBy(allVehicles, 'vehicleId');
      const vehiclesByRoute = _(allVehicles)
        .groupBy('route.id')
        .value();
      const vehicles = {
        active: allVehicles,
        route: vehiclesByRoute,
        id: vehiclesById,
      };
      const decodedShapes = activeShapes.map((shape) => ({
        ...shape,
        points: polyline.decode(shape.points),
      }));
      const shapes = {
        active: decodedShapes,
        route: {},
      };
      const stops = {
        active: activeStops,
        route: {},
        id: {},
      };
      const message = {
        type: e.type,
        requestId: e.requestId,
        vehicles,
        shapes,
        stops,
      };
      self.postMessage(message);
    });
};

self.addEventListener('message', (e) => {
  switch (e.data.type) {
    case 'vehicles':
      getVehicles(e.data);
      break;
    /*
    case 'routes':
      getRoutes(e.data);
      break;
    case 'stops':
      getStops(e.data);
      break;
    */
    default:
      break;
  }
}, false);
