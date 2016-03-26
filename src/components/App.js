import React, { Component, PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';
import BackgroundMap from 'components/BackgroundMap';

import { watchUserLocation, stopWatchingUserLocation } from 'actions/location';
import { watchVehicles, stopWatchingVehicles } from 'actions/oba/vehicles';
import { getNearbyTrips } from 'actions/oba/nearby';


class App extends Component {
  static propTypes = {
    currentTab: PropTypes.string.isRequired,
    globalError: PropTypes.string,

    watchUserLocation: PropTypes.func.isRequired,
    stopWatchingUserLocation: PropTypes.func.isRequired,
    userLocationError: PropTypes.string,

    watchVehicles: PropTypes.func.isRequired,
    stopWatchingVehicles: PropTypes.func.isRequired,

    getNearbyTrips: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.watchUserLocation()
      .then(() => this.props.getNearbyTrips());
    this.props.watchVehicles();
  }

  componentWillUnmount() {
    this.props.stopWatchingUserLocation();
    this.props.stopWatchingVehicles();
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

  renderGlobalError() {
    return <div>{this.props.globalError}</div>;
  }

  render() {
    return (
      <div>
        {this.renderGlobalError()}
        <BackgroundMap />
        {this.renderCurrent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTab: state.ui.currentTab,
  globalError: state.ui.globalError,
});

const mapDispatchToProps = {
  watchUserLocation,
  stopWatchingUserLocation,

  watchVehicles,
  stopWatchingVehicles,

  getNearbyTrips,
};

export default cssmodules(connect(mapStateToProps, mapDispatchToProps)(App), styles);
