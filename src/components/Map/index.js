import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { watchUserLocation } from 'actions/location';
import { mapSelector } from './MapSelectors';
import MapboxWrapper from './MapboxWrapper';

import styles from './styles.scss';

class MapLayer extends Component {
  static propTypes = {
    map: PropTypes.object,
    userLocation: PropTypes.object,
    watchUserLocation: PropTypes.func,
  }

  componentDidMount() {
    this.props.watchUserLocation();
    this.map = new MapboxWrapper('map');
  }

  componentWillReceiveProps(props) {
    const { map, userLocation } = props;
    this.map.setUserLocation(userLocation);
    this.map.setMap(map);
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
  map: mapSelector(state),
  userLocation: state.ui.userLocation,
});

const mapDispatchToProps = {
  watchUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapLayer);
