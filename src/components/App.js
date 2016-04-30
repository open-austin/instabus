import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';

import {
  ALL_ROUTES_PATH,
  ROUTE_PATH,
  DIRECTION_PATH,
  SAVED_PATH,
} from 'constants/Paths';

import MapLayer from 'components/Map';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';
import NavBar from 'components/NavBar';
import Saved from 'components/Saved';
import VehiclesLoading from 'components/VehiclesLoading';

import { getRoutes, getVehicles, initialVehiclesLoaded } from 'actions/oba';


class App extends Component {
  static propTypes = {
    globalError: PropTypes.string,
    route: PropTypes.object,
    getRoutes: PropTypes.func,
    getVehicles: PropTypes.func,
    initialVehiclesLoaded: PropTypes.func,
  }

  componentDidMount() {
    this.props.getVehicles().then(() => {
      this.props.initialVehiclesLoaded();
    });
    this.watchVehicles = setInterval(this.props.getVehicles, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.watchVehicles);
  }

  _renderGlobalError = () => <div>{this.props.globalError}</div>;

  _renderGlobalError() {
    return <div>{this.props.globalError}</div>;
  }

  _renderContext = () => {
    const name = this.props.route.name;
    switch (name) {
      case ALL_ROUTES_PATH:
        return <RouteList />;
      case ROUTE_PATH:
        return <StopList />;
      case DIRECTION_PATH:
        return <StopList />;
      case SAVED_PATH:
        return <Saved />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <MapLayer />
        <VehiclesLoading />
        <NavBar />
        { this._renderContext() }
      </div>
    );
  }
}

const mapDispatchToProps = {
  getRoutes,
  getVehicles,
  initialVehiclesLoaded,
};

const mapStateToProps = (state) => ({
  globalError: state.ui.globalError,
  route: state.ui.route,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
