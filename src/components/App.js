import React, { Component, PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import RouteList from 'routes/RouteList';
import NearbyTrips from 'trips/Nearby';
import StopList from 'stops/StopList';

import { CoordinatePointType } from 'constants/OBAPropTypes';
import { watchUserLocation, stopWatchingUserLocation } from 'app/actions';


class App extends Component {
  static propTypes = {
    userLocation: CoordinatePointType,
    watchUserLocation: PropTypes.func.isRequired,
    stopWatchingUserLocation: PropTypes.func.isRequired,
    userLocationError: PropTypes.string,
  }

  componentWillMount() {
    this.props.watchUserLocation();
  }

  componentWillUnmount() {
    this.props.stopWatchingUserLocation();
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

  render() {
    return (
      <div>
        {this.renderUserLocation()}
        <RouteList />
        <StopList />
        <NearbyTrips />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  userLocationError: state.userLocationError,
});

const mapDispatchToProps = {
  watchUserLocation,
  stopWatchingUserLocation,
};

export default cssmodules(connect(mapStateToProps, mapDispatchToProps)(App), styles);
