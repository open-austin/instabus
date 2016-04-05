import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Map as ReactLeafletMap,
  Polyline,
  Popup,
  TileLayer,
  Marker,
  CircleMarker,
} from 'react-leaflet';

import {
  CoordinatePointType,
  VehicleStatusType,
  StopType,
} from 'constants/OBAPropTypes';

import { vehiclesArraySelector, stopsSelector } from './BackgroundMapSelectors';
import { stopsInMapSelector } from 'selectors/oba';

import UserMarker from './UserMarker';
import VehicleMarker from './VehicleMarker';
import StopMarker from './StopMarker';

import styles from './styles.scss';

class BackgroundMap extends Component {

  static propTypes = {
    userLocation: CoordinatePointType,
    vehicles: PropTypes.arrayOf(VehicleStatusType),
    stops: PropTypes.arrayOf(StopType),
  };


  renderVehicles() {
    return this.props.vehicles.map((vehicle, i) => {
      if (!vehicle.location) {
        return null;
      }
      return (
        <VehicleMarker
          position={[vehicle.location.lat, vehicle.location.lon]}
          key={i}
        />
      );
    });
  }

  renderStops() {
    return this.props.stops.map((stop, i) => (
      <StopMarker
        position={[stop.lat, stop.lon]}
        key={i}
      />
    ));
  }

  render() {
    const retinaParam = window.devicePixelRatio && window.devicePixelRatio > 1 ? '@2x' : null;
    const url = `http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}${retinaParam}.png?access_token=pk.eyJ1IjoiaGFtZWVkbyIsImEiOiJHMnhTMDFvIn0.tFZs7sYMghY-xovxRPNNnw`;
    const attribution = '<a href="https://www.mapbox.com/about/maps/" target="_blank">&copy; Mapbox &copy; OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a>';

    return (
      <ReactLeafletMap
        center={[30.267153, -97.743061]}
        zoom={13}
        id="map"
        className={styles.map}
      >
        <TileLayer
          url={url}
          attribution={attribution}
        />
        {this.props.userLocation &&
          <UserMarker position={[this.props.userLocation.lat, this.props.userLocation.lon]} />
        }
        {this.renderStops()}
        {this.renderVehicles()}
      </ReactLeafletMap>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  userLocation: (state) => state.ui.userLocation,
  vehicles: vehiclesArraySelector,
  stops: stopsInMapSelector,
});

export default connect(mapStateToProps)(BackgroundMap);
