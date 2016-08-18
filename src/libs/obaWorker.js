import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import polyline from 'polyline';

const formatVehicles = (e, json) => {
  const {
    activeVehicles,
    trips,
    vehicles: newVehicles,
    shapes: encodedShapes,
    stops,
    stopLists,
  } = json;
  const oldVehicles = e.oldVehicles;
  const vehicles = _(newVehicles)
    .mapValues(vehicle => {
      const oldVehicle = oldVehicles && oldVehicles[vehicle.id];
      const newPosition = {
        lat: vehicle.lat,
        lon: vehicle.lon,
      };
      let position;
      if (oldVehicle) {
        position = {
          last: oldVehicle.current,
          current: oldVehicle.current,
          new: newPosition,
        };
      }
      else {
        position = {
          last: newPosition,
          current: newPosition,
          new: newPosition,
        };
      }
      return {
        ...vehicle,
        ...position,
      };
    })
    .value();
  const shapes = _(encodedShapes)
    .mapValues(shape => ({
      id: shape.id,
      shape: polyline.decode(shape.shape),
    }))
    .value();
  const message = {
    type: e.type,
    requestId: e.requestId,
    activeVehicles,
    trips,
    vehicles,
    shapes,
    stops,
    stopLists,
  };
  self.postMessage(message);
};

const getVehicles = (e) => {
  fetch('https://instabus-4750c.firebaseio.com/vehicles.json')
    .then(res => res.json())
    .then((json) => {
      formatVehicles(e, json);
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
