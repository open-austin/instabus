/* global L */

import _ from 'lodash';
import polyline from 'polyline';
import canvasOverlay from './CanvasOverlay';
import UserMarker from './UserMarker';
import StopMarker from './StopMarker';
import { mobile } from 'libs/mobile';

class MapboxWrapper {

  map = undefined;

  userLocation = undefined;
  userMarker = undefined;

  vehicles = undefined;
  vehiclesOverlay = undefined;
  canvasLayer = undefined;

  transitionStartTime = undefined;
  transitionTime = 500;

  polyline = undefined;
  polylineLayer = undefined;

  stops = undefined;
  stopMarkers = new Map()
  stopsLayer = undefined;

  boundsLayer = undefined;

  constructor(mapDiv, onMouseOverStop, onMouseOutStop) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';
    const mapInit = {
      center: [30.291708, -97.746557],
      zoom: 13,
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
    };
    this.map = L.mapbox.map(mapDiv, 'mapbox.streets', mapInit);
    this.map.on('contextmenu', () => {
      this.map.zoomOut();
    });
    this.onMouseOverStop = onMouseOverStop;
    this.onMouseOutStop = onMouseOutStop;
    const panes = this.map.getPanes();
    panes.overlayPane.style.zIndex = 99;
    panes.overlayPane.style.pointerEvents = 'none';
    panes.markerPane.style.zIndex = 98;
    this.boundsLayer = L.featureGroup().addTo(this.map);
    this.polylineLayer = L.featureGroup().addTo(this.boundsLayer);
    this.stopsLayer = L.featureGroup().addTo(this.boundsLayer);
    this.canvasLayer = L.featureGroup().addTo(this.map);
    this.pixelRatio = window.devicePixelRatio || 1;
    const busInitSize = 28;
    this.canvasInitSize = busInitSize + 8;
    const canvasSize = this.canvasInitSize * this.pixelRatio;
    const busSize = busInitSize * this.pixelRatio;
    const radius = busSize / 2;
    const offset = canvasSize / 2;
    this.oCanvas = document.createElement('canvas');
    this.oCanvas.width = canvasSize;
    this.oCanvas.height = canvasSize;
    const oCtx = this.oCanvas.getContext('2d');
    oCtx.fillStyle = '#fff';
    oCtx.beginPath();
    oCtx.arc(offset, offset, radius, 0, Math.PI * 2);
    oCtx.shadowColor = 'rgba(0,0,0,0.4)';
    oCtx.shadowBlur = 4;
    oCtx.shadowOffsetX = 0;
    oCtx.shadowOffsetY = 1;
    oCtx.fill();
    oCtx.closePath();
  }

  setUserLocation = (location) => {
    if (!this.userMarker && location) {
      const locationArray = [location.lat, location.lon];
      this.userMarker = L.marker(locationArray).addTo(this.boundsLayer);
      this.userMarker.setZIndexOffset(9999);
      this.userMarker.setIcon(L.divIcon(UserMarker));
    }
    else if (location && location !== this.userLocation) {
      const locationArray = [location.lat, location.lon];
      this.userMarker.setLatLng(L.latLng(locationArray));
    }
    this.userLocation = location;
  }

  setStopsAndPolyline = (stops, poly) => {
    this.setPolyline(poly);
    this.setStops(stops);
  }

  setStops = (stops) => {
    if (stops && stops !== this.stops) {
      this.stopsLayer.clearLayers();
      this.stops = stops;
      this.stops.forEach((stop) => {
        const locationArray = [stop.coords.lat, stop.coords.lon];
        const stopMarker = L.marker(locationArray, { title: stop.name }).addTo(this.stopsLayer);
        stopMarker.setIcon(L.divIcon(StopMarker));
        stopMarker.on('mouseover', this.onMouseOverStop);
        stopMarker.on('mouseout', this.onMouseOutStop);
      });
      this.map.fitBounds(this.boundsLayer.getBounds(), {
        animate: !mobile,
        paddingTopLeft: [0, 0],
        paddingBottomRight: [0, 0],
      });
    }
    else if (!stops && this.stops) {
      this.stops = undefined;
      this.stopsLayer.clearLayers();
    }
  }

  setPolyline = (poly) => {
    if (poly && poly !== this.polyline) {
      this.polylineLayer.clearLayers();
      this.polyline = poly;
      const points = polyline.decode(poly);
      const options = {
        color: '#157AFC',
        opacity: 0.5,
        className: 'polyline',
      };
      L.polyline(points, options).addTo(this.polylineLayer);
    }
    else if (!poly && this.polyline) {
      this.polyline = undefined;
      this.polylineLayer.clearLayers();
    }
  }

  setVehicles = (vehicles) => {
    let v = [];
    if (this.vehicles) {
      const oldPositions = _.keyBy(this.vehicles, 'id');
      v = vehicles.map((vehicle) => ({
        id: vehicle.id,
        route: vehicle.route.replace('1_', ''),
        lastPosition: oldPositions[vehicle.id] ? oldPositions[vehicle.id].currentPosition : vehicle.coords,
        currentPosition: oldPositions[vehicle.id] ? oldPositions[vehicle.id].currentPosition : vehicle.coords,
        nextPosition: vehicle.coords,
      }));
      this.vehicles = v;
      this.transitionStartTime = Date.now();
      requestAnimationFrame(this.translateVehicles);
    }
    else {
      v = vehicles.map((vehicle) => ({
        id: vehicle.id,
        route: vehicle.route.replace('1_', ''),
        lastPosition: vehicle.coords,
        currentPosition: vehicle.coords,
        nextPosition: vehicle.coords,
      }));
      this.vehicles = v;
      this.vehiclesOverlay = canvasOverlay()
        .drawing(this.drawOnCanvas)
        .addTo(this.canvasLayer);
    }
  }

  translateVehicles = () => {
    if (!this.transitionStartTime) return;

    const time = Date.now();
    const difference = time - this.transitionStartTime;
    if (difference >= this.transitionTime) {
      this.vehicles = this.vehicles.map((vehicle) => {
        const v = {
          id: vehicle.id,
          route: vehicle.route,
          lastPosition: vehicle.nextPosition,
          currentPosition: vehicle.nextPosition,
          nextPosition: null,
        };
        return v;
      });
      this.transitionStartTime = null;
      this.vehiclesOverlay.redraw();
      return;
    }
    this.vehicles = this.vehicles.map((vehicle) => {
      const percentTranslation = difference / this.transitionTime;
      if (!vehicle.lastPosition || !vehicle.nextPosition) return vehicle;
      const lat = vehicle.lastPosition.lat + ((vehicle.nextPosition.lat - vehicle.lastPosition.lat) * percentTranslation);
      const lon = vehicle.lastPosition.lon + ((vehicle.nextPosition.lon - vehicle.lastPosition.lon) * percentTranslation);
      const v = {
        id: vehicle.id,
        route: vehicle.route,
        lastPosition: vehicle.lastPosition,
        currentPosition: {
          lat,
          lon,
        },
        nextPosition: vehicle.nextPosition,
      };
      return v;
    });
    this.vehiclesOverlay.redraw();
    requestAnimationFrame(this.translateVehicles);
  }

  drawOnCanvas = (overlay, params) => {
    const ctx = params.canvas.getContext('2d');
    ctx.scale(this.pixelRatio, this.pixelRatio);
    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    for (let i = 0; i < this.vehicles.length; i++) {
      const v = this.vehicles[i];
      if (v.currentPosition && params.bounds.contains([v.currentPosition.lat, v.currentPosition.lon])) {
        const dot = overlay._map.latLngToContainerPoint([v.currentPosition.lat, v.currentPosition.lon]);
        const x = dot.x - this.canvasInitSize / 2;
        const y = dot.y - this.canvasInitSize / 2;
        ctx.drawImage(this.oCanvas, x, y, this.canvasInitSize, this.canvasInitSize);
        ctx.fillStyle = '#000';
        const textX = dot.x;
        const textY = dot.y + 5;
        ctx.fillText(v.route, textX, textY);
      }
    }
  };

}

export default MapboxWrapper;
