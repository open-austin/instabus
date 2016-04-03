import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from 'styles/base.scss';
import BackgroundMap from 'components/BackgroundMap';
import Nearby from 'components/Nearby';

import { watchUserLocation, stopWatchingUserLocation } from 'actions/location';
import { watchVehicles, stopWatchingVehicles } from 'actions/oba/vehicles';


class App extends Component {
  static propTypes = {
    children: PropTypes.node,

    currentAgency: PropTypes.string,

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

  renderNav() {
    return (
      <div>
        <Link to="/route"> Routes </Link>
        <Link to="/nearby"> Nearby </Link>
      </div>
    );
  }

  renderGlobalError() {
    return <div>{this.props.globalError}</div>;
  }

  render() {
    return (
      <div className={styles.container}>
        <BackgroundMap params={this.props.params} />
        <div className={styles.wideNav} />
        <div className={styles.context}>
          <div>Current agency: {this.props.currentAgency}</div>
          {this.renderGlobalError()}
          {this.renderNav()}
          {this.props.children}
        </div>
        <div className={styles.zoom} />
        <div className={styles.key} />
        <div className={styles.mobileNav} />
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
