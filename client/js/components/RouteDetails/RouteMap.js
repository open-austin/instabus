import React, {Component, PropTypes} from 'react';
import {Map, Popup, TileLayer} from 'react-leaflet';

import {RouteShape} from '../../constants/PropTypes';

export default class RouteMap extends Component {
  render() {
    const attributionText = '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>';
    return (
        <Map
          center={this.props.center}
          zoom={13}
          id="map"
        >
          <TileLayer
            url="https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png"
            attribution={attributionText}
            id="drmaples.ipbindf8"
          />
        </Map>
    );
  }
}

RouteMap.propTypes = {
  route: PropTypes.shape(RouteShape),
  center: PropTypes.array.isRequired,
};
