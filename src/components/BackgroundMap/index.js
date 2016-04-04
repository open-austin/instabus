import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  RouteType,
  VehicleStatusType,
  CoordinatePointType,
  EncodedPolylineType,
} from 'constants/OBAPropTypes';
import {
  currentRouteSelector,
} from 'selectors/oba';
import {
  vehiclesSelector,
  stopIdsSelector,
  polylinesSelector,
} from 'components/BackgroundMap/BackgroundMapSelectors';

import polyline from 'polyline';

import styles from './styles.scss';

class BackgroundMap extends Component {
  static propTypes = {
    route: RouteType,
    vehicles: PropTypes.arrayOf(VehicleStatusType),
    stopIds: PropTypes.arrayOf(PropTypes.string),
    polylines: PropTypes.arrayOf(EncodedPolylineType),
    userLocation: CoordinatePointType,
    userLocationError: PropTypes.string,
  };

  componentDidMount() {
    // will all be removed
    L.mapbox.accessToken = 'pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw';
    const mapInit = {
      center: [30.291708, -97.746557],
      zoom: 13,
      attributionControl: false,
      zoomControl: false,
    };
    this.map = L.mapbox.map('map', 'mapbox.streets', mapInit);
    this.route = L.layerGroup().addTo(this.map);
    if (this.props.userLocation) {
      const userLocationArray = [
        this.props.userLocation.lat,
        this.props.userLocation.lon,
      ];
      this.userMarker = L.marker(userLocationArray).addTo(this.map);
    }
  }

  componentDidUpdate(prevProps) {
    // should be moved to render function
    if (!prevProps.userLocation && this.props.userLocation) {
      const userLocationArray = [
        this.props.userLocation.lat,
        this.props.userLocation.lon,
      ];
      this.userMarker = L.marker(userLocationArray).addTo(this.map);
      const icon = {
        className: styles.user,
        iconSize: [24, 24],
        html: `<div class="${styles.userPulse}"></div><div class="${styles.userDot}"></div>`,
      };
      this.userMarker.setIcon(L.divIcon(icon));
    } else if (prevProps.userLocation && this.props.userLocation) {
      const userLocationArray = [
        this.props.userLocation.lat,
        this.props.userLocation.lon,
      ];
      this.userMarker.setLatLng(L.latLng(userLocationArray));
    }

    if (prevProps.polylines != this.props.polylines) {
      if (!this.props.polylines[0]) return;
      this.route.clearLayers()
      const points = polyline.decode(this.props.polylines[0].points);
      const options = {
        color: '#157AFC',
      };
      L.polyline(points, options).addTo(this.route);
      //this.map.fitBounds(this.route.getBounds());
    }
  }

  renderUserLocation() {
    if (this.props.userLocationError) {
      return <div>Can't get your location: ${this.props.userLocationError}</div>;
    }
    else if (this.props.userLocation) {
      return <div>You are at {this.props.userLocation.lat}, {this.props.userLocation.lon}</div>;
    }
    return <div>Finding your location...</div>;
  }

  /*
    <h1>Map</h1>
    <div>Things on the map</div>
    <ul>
      <li>{this.renderUserLocation()}</li>
      <li>route: {route && route.longName}</li>
      <li>0 vehicles {vehicles.length}</li>
      <li>0 stopIds {JSON.stringify(stopIds)}</li>
      <li>0 {JSON.stringify(polylines)}</li>
    </ul>
  */

  render() {
    const { route, vehicles, stopIds, polylines } = this.props;

    return (
      <div id="map" className={styles.map} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userLocation: (state) => state.ui.userLocation,
  userLocationError: (state) => state.ui.userLocationError,
  route: currentRouteSelector,
  vehicles: vehiclesSelector,
  stopIds: stopIdsSelector,
  polylines: polylinesSelector,
});

export default connect(mapStateToProps)(BackgroundMap);
