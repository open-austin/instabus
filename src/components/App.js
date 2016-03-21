import React, { Component, PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';


import { CoordinatePointType } from 'constants/OBAPropTypes';
import { watchUserLocation, stopWatchingUserLocation } from 'actions/location';


class App extends Component {
  static propTypes = {
    currentTab: PropTypes.string.isRequired,
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

  renderCurrent() {
    // FIXME: add proper routing
    if (this.props.currentTab === 'RouteList') {
      return <RouteList />;
    }
    if (this.props.currentTab === 'StopList') {
      return <StopList />;
    }
    return <div>404</div>;
  }

  render() {
    return (
      <div>
        {this.renderUserLocation()}
        {this.renderCurrent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
  userLocationError: state.userLocationError,
  currentTab: state.currentTab,
});

const mapDispatchToProps = {
  watchUserLocation,
  stopWatchingUserLocation,
};

export default cssmodules(connect(mapStateToProps, mapDispatchToProps)(App), styles);
