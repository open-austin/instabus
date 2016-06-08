/* global L */

import _ from 'lodash';
import canvasOverlay from './CanvasOverlay';
import UserMarker from './UserMarker';
import StopMarker from './StopMarker';
import stopPopup from './StopPopup';
import { mobile } from 'libs/mobile';
import rbush from 'rbush';

import {
  ROUTE_PATH,
  DIRECTION_PATH,
} from 'constants/Paths';

import { GlobalHistory, Router } from 'libs/routing';

class MapboxWrapper {

  map = undefined;

  tree = rbush();

  userLocation = undefined;
  userMarker = undefined;

  vehicles = undefined;
  vehiclesOverlay = undefined;
  canvasLayer = undefined;

  transitionStartTime = undefined;
  transitionTime = 400;

  shapes = [];

  stops = [];

  polylineLayer = undefined;

  constructor(mapDiv) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';
    const mapInit = {
      center: [30.291708, -97.746557],
      zoom: 13,
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
    };
    this.map = L.mapbox.map(mapDiv).setView(mapInit.center, mapInit.zoom);
    L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v9').addTo(this.map); // dark-v9, streets-v9
    this.map.on('contextmenu', () => {
      this.map.zoomOut();
    });
    this.map.on('click', (e) => {
      const { containerPoint } = e;
      const { x, y } = containerPoint;
      const vehicles = this.tree.search([x, y, x, y]).map(vehicle => vehicle[4]).reverse();
      if (vehicles[0]) {
        const vehicle = vehicles[0];
        if (vehicle.direction) {
          GlobalHistory.push(Router.generate(DIRECTION_PATH, { routeId: vehicle.routeId, routeDirection: vehicle.direction }));
        }
        else {
          GlobalHistory.push(Router.generate(ROUTE_PATH, { routeId: vehicle.routeId }));
        }
      }
    });
    const panes = this.map.getPanes();
    panes.overlayPane.style.pointerEvents = 'none';
    this.polylineLayer = L.featureGroup().addTo(this.map);
    this.canvasLayer = L.featureGroup().addTo(this.map);
    this.pixelRatio = window.devicePixelRatio || 1;
    const busInitSize = 23;
    this.busInitRadius = busInitSize / 2;
    this.canvasInitSize = busInitSize + 20;
    this.canvasInitRadius = this.canvasInitSize / 2;
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
    oCtx.moveTo(offset - 14, offset - radius + 8);
    oCtx.lineTo(offset, offset - radius - 8);
    oCtx.lineTo(offset + 14, offset - radius + 8);
    oCtx.fill();
    oCtx.closePath();
    // south facing canvas
    this.southCanvas = document.createElement('canvas');
    this.southCanvas.width = canvasSize;
    this.southCanvas.height = canvasSize;
    const southCtx = this.southCanvas.getContext('2d');
    southCtx.shadowColor = 'rgba(0,0,0,0.4)';
    southCtx.shadowBlur = 4;
    southCtx.shadowOffsetX = 0;
    southCtx.shadowOffsetY = 1;
    southCtx.save();
    southCtx.translate(offset, offset);
    southCtx.rotate(Math.PI);
    southCtx.translate(-offset, -offset);
    southCtx.drawImage(this.oCanvas, 0, 0, canvasSize, canvasSize);
    southCtx.restore();
    southCtx.fill();
    // west facing canvas without shadow in chrome
    this.westMarkerCanvas = document.createElement('canvas');
    this.westMarkerCanvas.width = canvasSize;
    this.westMarkerCanvas.height = canvasSize;
    const westMarkerCtx = this.westMarkerCanvas.getContext('2d');
    westMarkerCtx.translate(offset, offset);
    westMarkerCtx.rotate(-Math.PI / 2);
    westMarkerCtx.translate(-offset, -offset);
    westMarkerCtx.drawImage(this.oCanvas, 0, 0, canvasSize, canvasSize);
    // west facing canvas
    this.westCanvas = document.createElement('canvas');
    this.westCanvas.width = canvasSize;
    this.westCanvas.height = canvasSize;
    const westCtx = this.westCanvas.getContext('2d');
    westCtx.shadowColor = 'rgba(0,0,0,0.4)';
    westCtx.shadowBlur = 4;
    westCtx.shadowOffsetX = 0;
    westCtx.shadowOffsetY = 1;
    westCtx.drawImage(this.westMarkerCanvas, 0, 0, canvasSize, canvasSize);
    westCtx.fill();
    // east facing canvas without shadow in chrome
    this.eastMarkerCanvas = document.createElement('canvas');
    this.eastMarkerCanvas.width = canvasSize;
    this.eastMarkerCanvas.height = canvasSize;
    const eastMarkerCtx = this.eastMarkerCanvas.getContext('2d');
    eastMarkerCtx.translate(offset, offset);
    eastMarkerCtx.rotate(Math.PI / 2);
    eastMarkerCtx.translate(-offset, -offset);
    eastMarkerCtx.drawImage(this.oCanvas, 0, 0, canvasSize, canvasSize);
    // east facing canvas
    this.eastCanvas = document.createElement('canvas');
    this.eastCanvas.width = canvasSize;
    this.eastCanvas.height = canvasSize;
    const eastCtx = this.eastCanvas.getContext('2d');
    eastCtx.shadowColor = 'rgba(0,0,0,0.4)';
    eastCtx.shadowBlur = 4;
    eastCtx.shadowOffsetX = 0;
    eastCtx.shadowOffsetY = 1;
    eastCtx.drawImage(this.eastMarkerCanvas, 0, 0, canvasSize, canvasSize);
    eastCtx.fill();
    // north facing canvas
    this.northCanvas = document.createElement('canvas');
    this.northCanvas.width = canvasSize;
    this.northCanvas.height = canvasSize;
    const northCtx = this.northCanvas.getContext('2d');
    northCtx.shadowColor = 'rgba(0,0,0,0.4)';
    northCtx.shadowBlur = 4;
    northCtx.shadowOffsetX = 0;
    northCtx.shadowOffsetY = 1;
    northCtx.drawImage(this.oCanvas, 0, 0, canvasSize, canvasSize);
    northCtx.fill();
    // non facing canvas
    this.regularCanvas = document.createElement('canvas');
    this.regularCanvas.width = canvasSize;
    this.regularCanvas.height = canvasSize;
    const rCtx = this.regularCanvas.getContext('2d');
    rCtx.fillStyle = '#fff';
    rCtx.beginPath();
    rCtx.arc(offset, offset, radius, 0, Math.PI * 2);
    rCtx.shadowColor = 'rgba(0,0,0,0.4)';
    rCtx.shadowBlur = 4;
    rCtx.shadowOffsetX = 0;
    rCtx.shadowOffsetY = 1;
    rCtx.fill();
    rCtx.closePath();
  }

  setUserLocation = (location) => {
    if (!this.userMarker && location) {
      const locationArray = [location.lat, location.lon];
      this.userMarker = L.marker(locationArray).addTo(this.map);
      this.userMarker.setZIndexOffset(9999);
      this.userMarker.setIcon(L.divIcon(UserMarker));
    }
    else if (location && location !== this.userLocation) {
      const locationArray = [location.lat, location.lon];
      this.userMarker.setLatLng(L.latLng(locationArray));
    }
    this.userLocation = location;
  }

  setMap = (data) => {
    this.setVehicles(data.vehicles);
    this.setStops(data.stops);
    // this.setShapes(data.shapes);
    this.setPolyline(data.shapes);
  }

  setStops = (stops) => {
    if (this.stops !== stops) {
      this.stops = stops;
    }
  }

  setShapes = (shapes) => {
    if (this.shapes !== shapes) {
      this.shapes = shapes;
    }
  }

  setPolyline = (shapes) => {
    if (this.shapes !== shapes) {
      this.shapes = shapes;
      this.polylineLayer.clearLayers();
      shapes.forEach((shape) => {
        const options = {
          color: shape.color,
          opacity: 1,
          className: 'polyline',
          weight: 3,
        };
        L.polyline(shape.points, options).addTo(this.polylineLayer);
      });
    }
  }

  setVehicles = (vehicles) => {
    let v = [];
    if (this.vehicles) {
      const oldPositions = _.keyBy(this.vehicles, 'id');
      v = vehicles.map((vehicle) => ({
        id: vehicle.vehicleId,
        route: vehicle.route.shortName,
        routeId: vehicle.route.id,
        direction: vehicle.route.direction,
        lastPosition: oldPositions[vehicle.vehicleId] ? oldPositions[vehicle.vehicleId].currentPosition : vehicle.location,
        currentPosition: oldPositions[vehicle.vehicleId] ? oldPositions[vehicle.vehicleId].currentPosition : vehicle.location,
        nextPosition: vehicle.location,
        color: vehicle.color,
      }));
      this.vehicles = v;
      this.transitionStartTime = Date.now();
      requestAnimationFrame(this.translateVehicles);
    }
    else {
      v = vehicles.map((vehicle) => ({
        id: vehicle.vehicleId,
        route: vehicle.route.shortName,
        routeId: vehicle.route.id,
        direction: vehicle.route.direction,
        lastPosition: vehicle.location,
        currentPosition: vehicle.location,
        nextPosition: vehicle.location,
        color: vehicle.color,
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
          routeId: vehicle.routeId,
          direction: vehicle.direction,
          lastPosition: vehicle.nextPosition,
          currentPosition: vehicle.nextPosition,
          nextPosition: null,
          color: vehicle.color,
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
        routeId: vehicle.routeId,
        direction: vehicle.direction,
        lastPosition: vehicle.lastPosition,
        currentPosition: {
          lat,
          lon,
        },
        nextPosition: vehicle.nextPosition,
        color: vehicle.color,
      };
      return v;
    });
    this.vehiclesOverlay.redraw();
    requestAnimationFrame(this.translateVehicles);
  }

  drawOnCanvas = (overlay, params) => {
    this.tree.clear();
    const ctx = params.canvas.getContext('2d');
    ctx.scale(this.pixelRatio, this.pixelRatio);
    ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
    ctx.font = '9px Arial';
    ctx.textAlign = 'center';
    /*
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = (params.zoom > 15) ? 4 : 2;
    const lineOffset = (params.zoom > 15) ? 2 : 1;
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = '#157AFC';
    ctx.beginPath();
    this.shapes.forEach((shape) => {
      shape.points.forEach((point, i) => {
        const dot = overlay._map.latLngToContainerPoint([point[0], point[1]]);
        const x = dot.x - lineOffset;
        const y = dot.y - lineOffset;
        if (i === 0) {
          ctx.moveTo(x, y);
        }
        else if (!params.bounds.contains([point[0], point[1]])) {
          ctx.moveTo(x, y);
        }
        else {
          ctx.lineTo(x, y);
        }
      });
    });
    ctx.stroke();
    ctx.closePath();
    */
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
    if (params.zoom > 14) {
      ctx.fillStyle = '#BDBDBD';
      this.stops.forEach((s) => {
        if (!params.bounds.contains([s.lat, s.lon])) return;
        ctx.beginPath();
        const dot = overlay._map.latLngToContainerPoint([s.lat, s.lon]);
        const x = dot.x - 2;
        const y = dot.y - 2;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    }
    this.vehicles.forEach((v) => {
      const boundings = [];
      if (v.currentPosition && params.bounds.contains([v.currentPosition.lat, v.currentPosition.lon])) {
        const dot = overlay._map.latLngToContainerPoint([v.currentPosition.lat, v.currentPosition.lon]);
        const x = dot.x - this.canvasInitRadius;
        const y = dot.y - this.canvasInitRadius;
        switch (v.direction) {
          case 'eastbound':
            ctx.drawImage(this.eastCanvas, x, y, this.canvasInitSize, this.canvasInitSize);
            break;
          case 'westbound':
            ctx.drawImage(this.westCanvas, x, y, this.canvasInitSize, this.canvasInitSize);
            break;
          case 'southbound':
            ctx.drawImage(this.southCanvas, x, y, this.canvasInitSize, this.canvasInitSize);
            break;
          case 'northbound':
            ctx.drawImage(this.northCanvas, x, y, this.canvasInitSize, this.canvasInitSize);
            break;
          default:
            ctx.drawImage(this.regularCanvas, x, y, this.canvasInitSize, this.canvasInitSize);
        }
        // draw color dot
        ctx.fillStyle = v.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        // draw route id
        ctx.fillStyle = '#fff';
        const textX = dot.x;
        const textY = dot.y + 3.5;
        ctx.fillText(v.route, textX, textY);
        // add to collision map
        boundings.push([dot.x - this.busInitRadius, dot.y - this.busInitRadius, dot.x + this.busInitRadius, dot.y + this.busInitRadius, {
          id: v.id,
          direction: v.direction,
          routeId: v.routeId,
        }]);
      }
      this.tree.load(boundings);
    });
  };

}

export default MapboxWrapper;
