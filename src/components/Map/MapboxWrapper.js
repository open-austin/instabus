/* global L */

import _ from 'lodash';
import canvasOverlay from './CanvasOverlay';
import UserMarker from './UserMarker';
import StopMarker from './StopMarker';
import stopPopup from './StopPopup';
import { mobile } from 'libs/mobile';

class MapboxWrapper {

  map = undefined;

  userLocation = undefined;
  userMarker = undefined;

  vehicles = undefined;
  vehiclesOverlay = undefined;
  canvasLayer = undefined;

  transitionStartTime = undefined;
  transitionTime = 400;

  polyline = undefined;
  polylineLayer = undefined;

  stops = undefined;
  stopMarkers = [];
  stopsLayer = undefined;

  boundsLayer = undefined;

  constructor(mapDiv) {
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
    const panes = this.map.getPanes();
    panes.overlayPane.style.pointerEvents = 'none';
    this.boundsLayer = L.featureGroup().addTo(this.map);
    this.polylineLayer = L.featureGroup().addTo(this.boundsLayer);
    this.stopsLayer = L.featureGroup().addTo(this.boundsLayer);
    this.canvasLayer = L.featureGroup().addTo(this.map);
    this.pixelRatio = window.devicePixelRatio || 1;
    const busInitSize = 28;
    this.canvasInitSize = busInitSize + 20;
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
      if (!mobile) {
        this.stopMarkers.forEach((marker) => {
          marker.off('click');
          marker.off('mouseover');
          marker.off('mouseout');
        });
      }
      this.stopsLayer.clearLayers();
      this.stops = stops;
      this.stopMarkers = this.stops.map((stop) => {
        const locationArray = [stop.coords.lat, stop.coords.lon];
        const stopMarker = L.marker(locationArray).addTo(this.stopsLayer);
        stopMarker.setIcon(L.divIcon(StopMarker));
        stopMarker.bindPopup(stopPopup(stop.name), {
          offset: L.point(2, 15),
          closeButton: false,
        });
        if (!mobile) {
          stopMarker.on('click', (e) => {
            e.preventDefault();
          });
          stopMarker.on('mouseover', () => {
            stopMarker.openPopup();
          });
          stopMarker.on('mouseout', () => {
            stopMarker.closePopup();
          });
        }
        return stopMarker;
      });
      setTimeout(() => {
        this.map.fitBounds(this.boundsLayer.getBounds(), {
          animate: !mobile,
          paddingTopLeft: [0, 0],
          paddingBottomRight: [0, 0],
        });
      }, 250);
    }
    else if (!stops && this.stops) {
      this.stops = undefined;
      if (!mobile) {
        this.stopMarkers.forEach((marker) => {
          marker.off('click');
          marker.off('mouseover');
          marker.off('mouseout');
        });
      }
      this.stopsLayer.clearLayers();
      this.stopMarkers = [];
    }
  }

  setPolyline = (polyline) => {
    if (polyline && (!this.polyline || polyline.encoded !== this.polyline.encoded)) {
      this.polylineLayer.clearLayers();
      this.polyline = polyline;
      const options = {
        color: '#157AFC',
        opacity: 0.5,
        className: 'polyline',
      };
      L.polyline(this.polyline.points, options).addTo(this.polylineLayer);
    }
    else if (!polyline && this.polyline) {
      this.polyline = undefined;
      this.polylineLayer.clearLayers();
    }
  }

  setVehicles = (vehicles) => {
    let v = [];
    if (this.vehicles) {
      const oldPositions = _.keyBy(this.vehicles, 'id');
      v = vehicles.map((vehicle) => ({
        id: vehicle.vehicleId,
        route: vehicle.route.shortName,
        direction: vehicle.route.direction,
        lastPosition: oldPositions[vehicle.vehicleId] ? oldPositions[vehicle.vehicleId].currentPosition : vehicle.tripStatus.position,
        currentPosition: oldPositions[vehicle.vehicleId] ? oldPositions[vehicle.vehicleId].currentPosition : vehicle.tripStatus.position,
        nextPosition: vehicle.tripStatus.position,
      }));
      this.vehicles = v;
      this.transitionStartTime = Date.now();
      requestAnimationFrame(this.translateVehicles);
    }
    else {
      v = vehicles.map((vehicle) => ({
        id: vehicle.vehicleId,
        route: vehicle.route.shortName,
        direction: vehicle.route.direction,
        lastPosition: vehicle.tripStatus.position,
        currentPosition: vehicle.tripStatus.position,
        nextPosition: vehicle.tripStatus.position,
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
          direction: vehicle.direction,
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
        direction: vehicle.direction,
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
        ctx.fillStyle = '#000';
        const textX = dot.x;
        const textY = dot.y + 5;
        ctx.fillText(v.route, textX, textY);
      }
    }
  };

}

export default MapboxWrapper;
