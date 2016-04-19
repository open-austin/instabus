import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { watchUserLocation } from 'actions/location';
import { vehiclesSelector, polylineSelector, stopsSelector } from 'selectors/oba';
import MapboxWrapper from './MapboxWrapper';

import styles from './styles.scss';

class MapLayer extends Component {
  static propTypes = {
    route: PropTypes.object,
    vehicles: PropTypes.arrayOf(PropTypes.object),
    stops: PropTypes.arrayOf(PropTypes.object),
    userLocation: PropTypes.object,
    watchUserLocation: PropTypes.func,
  }

  componentDidMount() {
    this.props.watchUserLocation();
    this.map = new MapboxWrapper('map');
  }

  componentWillReceiveProps(props) {
    const { userLocation, vehicles, polyline, stops } = props;
    this.map.setUserLocation(userLocation);
    this.map.setPolyline(polyline);
    this.map.setStops(stops);
    this.map.setVehicles(vehicles);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div id="map" className={styles.map} />
    );
  }
}

const mapStateToProps = (state) => ({
  vehicles: vehiclesSelector(state),
  polyline: polylineSelector(state),
  stops: stopsSelector(state),
  route: state.ui.route,
  userLocation: state.ui.userLocation,
});

const mapDispatchToProps = {
  watchUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapLayer);
