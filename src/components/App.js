import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import BackgroundMap from 'components/BackgroundMap';
import TabBar from 'components/TabBar';
import CurrentTab from 'components/CurrentTab';

import { watchUserLocation, stopWatchingUserLocation } from 'actions/location';
import { watchVehicles, stopWatchingVehicles } from 'actions/oba/vehicles';

class App extends Component {
  static propTypes = {
    globalError: PropTypes.string,

    watchUserLocation: PropTypes.func.isRequired,
    stopWatchingUserLocation: PropTypes.func.isRequired,
    userLocationError: PropTypes.string,

    watchVehicles: PropTypes.func.isRequired,
    stopWatchingVehicles: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.watchUserLocation();

    this.props.watchVehicles();
  }

  componentWillUnmount() {
    this.props.stopWatchingUserLocation();
    this.props.stopWatchingVehicles();
  }

  renderGlobalError() {
    return <div>{this.props.globalError}</div>;
  }

  render() {
    return (
      <div className={styles.container}>
        <BackgroundMap />
        <TabBar />
        <div className={styles.context}>
          {this.renderGlobalError()}
          <CurrentTab />
        </div>
        <div className={styles.zoom} />
        <div className={styles.key} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalError: state.ui.globalError,
});

const mapDispatchToProps = {
  watchUserLocation,
  stopWatchingUserLocation,

  watchVehicles,
  stopWatchingVehicles,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
