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

import { CoordinatePointType } from 'constants/OBAPropTypes';

import UserMarker from './UserMarker';

import styles from './styles.scss';

class BackgroundMap extends Component {

  static propTypes = {
    userLocation: CoordinatePointType,
  };

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
      </ReactLeafletMap>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  userLocation: (state) => state.ui.userLocation,
});

export default connect(mapStateToProps)(BackgroundMap);
