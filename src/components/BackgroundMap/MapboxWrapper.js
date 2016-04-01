import polyline from 'polyline';
import styles from './styles.scss';

const userMarkerHtml = `<div class="${styles.userPulse}"></div><div class="${styles.userDot}"></div>`;

const stopMarkerHtml = `<div class="${styles.stopDot}"></div>`;

const vehicleMarker = function (direction) {
  switch (direction) {
    case 'north':
      break;
    case 'south':
      break;
    case 'east':
      break;
    case 'west':
      break;
    default:
      return;
  }
};

class MapboxWrapper {

  map = undefined;

  userLocation = undefined;
  userMarker = undefined;

  route = undefined;
  stops = undefined;
  routeAndStopsLayer = undefined;

  vehicles = undefined;
  vehiclesLayer = undefined;

  constructor(mapDiv) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';
    const mapInit = {
      center: [30.291708, -97.746557],
      zoom: 13,
      attributionControl: false,
      zoomControl: false,
    };
    this.map = L.mapbox.map(mapDiv, 'mapbox.streets', mapInit);
    this.routeAndStopsLayer = L.layerGroup().addTo(this.map);
    this.vehiclesLayer = L.layerGroup().addTo(this.map);
  }

  setUserLocation = (location) => {
    if (!this.userLocation && location) {

    } else if (location && location != this.userLocation) {

    }
  }

  setRouteAndStops = (route, stops) => {

  }

  setVehicles = (vehicles) => {

  }

}

export default MapboxWrapper;
