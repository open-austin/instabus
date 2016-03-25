import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  RouteType,
  VehicleType,
  StopType,
  CoordinatePointType,
  EncodedPolylineType,
} from 'constants/OBAPropTypes';
import {
  currentRouteSelector,
} from 'selectors/oba';
import {
  vehiclesSelector,
  stopsSelector,
  polylinesSelector,
} from 'components/BackgroundMap/selectors';


class BackgroundMap extends Component {
  static propTypes = {
    route: RouteType,
    vehicles: PropTypes.arrayOf(VehicleType),
    stops: PropTypes.arrayOf(StopType),
    polylines: PropTypes.arrayOf(EncodedPolylineType),
    userLocation: CoordinatePointType,
  };

  renderUserLocation() {
    if (this.props.userLocationError) {
      return <div>Can't get your location: ${this.props.userLocationError}</div>;
    }
    else if (this.props.userLocation) {
      return <div>You are at {this.props.userLocation.lat}, {this.props.userLocation.lon}</div>;
    }
    return <div>Finding your location...</div>;
  }

  render() {
    const { route, vehicles, stops, polylines } = this.props;

    return (
      <div>
        <h1>Map</h1>
        <div>Things on the map</div>
        <ul>
          <li>{this.renderUserLocation()}</li>
          <li>route: {route && route.longName}</li>
          <li>0 vehicles {vehicles.length}</li>
          <li>0 stops {JSON.stringify(stops)}</li>
          <li>0 {JSON.stringify(polylines)}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userLocation: (state) => state.ui.userLocation,
  userLocationError: (state) => state.ui.userLocationError,
  route: currentRouteSelector,
  vehicles: vehiclesSelector,
  stops: stopsSelector,
  polylines: polylinesSelector,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundMap);
