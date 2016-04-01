import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';
import BackgroundMap from 'components/BackgroundMap';
import Nearby from 'components/Nearby';

import { setCurrentTab } from 'actions/ui';
import { watchUserLocation, stopWatchingUserLocation } from 'actions/location';
import { watchVehicles, stopWatchingVehicles } from 'actions/oba/vehicles';


class App extends Component {
  static propTypes = {
    currentAgency: PropTypes.string,
    currentRoute: PropTypes.string,

    currentTab: PropTypes.string.isRequired,
    setCurrentTab: PropTypes.func.isRequired,
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

  renderCurrent() {
    // FIXME: add proper routing
    if (this.props.currentTab === 'RouteList') {
      return <RouteList />;
    }
    if (this.props.currentTab === 'StopList') {
      return <StopList />;
    }
    if (this.props.currentTab === 'Nearby') {
      return <Nearby />;
    }
    return null;
  }

  renderNav() {
    return (
      <div>
        <div>{this.props.currentTab}</div>
        <button onClick={() => this.props.setCurrentTab('RouteList')}> RouteList </button>
        {this.props.currentRoute && <button onClick={() => this.props.setCurrentTab('StopList')}> StopList </button>}
        <button onClick={() => this.props.setCurrentTab('Nearby')}> Nearby </button>
      </div>
    );
  }

  renderGlobalError() {
    return <div>{this.props.globalError}</div>;
  }

  render() {
    return (
      <div className={styles.container}>
        <BackgroundMap />
        <div className={styles.wideNav} />
        <div className={styles.context}>
          <div>Current agency: {this.props.currentAgency}</div>
          <div>Current route: {this.props.currentRoute}</div>
          {this.renderGlobalError()}
          {this.renderNav()}
          {this.renderCurrent()}
        </div>
        <div className={styles.zoom} />
        <div className={styles.key} />
        <div className={styles.mobileNav} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAgency: state.ui.currentAgency,
  currentRoute: state.ui.currentRoute,
  currentTab: state.ui.currentTab,
  globalError: state.ui.globalError,
});

const mapDispatchToProps = {
  setCurrentTab,

  watchUserLocation,
  stopWatchingUserLocation,

  watchVehicles,
  stopWatchingVehicles,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
