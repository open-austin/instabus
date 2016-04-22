import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';

import {
  ALL_ROUTES,
  ROUTE,
  DIRECTION,
  FAVORITES,
} from 'constants';

import MapLayer from 'components/Map';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';
import NavBar from 'components/NavBar';

import { getRoutes, getVehicles } from 'actions/oba';

class App extends Component {
  static propTypes = {
    globalError: PropTypes.string,
    route: PropTypes.object,
    getRoutes: PropTypes.func,
    getVehicles: PropTypes.func,
  }

  componentDidMount() {
    this.props.getRoutes().then(() => {
      this.props.getVehicles();
      this.watchVehicles = setInterval(this.props.getVehicles, 10000);
    });
    // this.props.getVehicles();
    // this.watchVehicles = setInterval(this.props.getVehicles, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.watchVehicles);
  }

  _renderGlobalError = () => <div>{this.props.globalError}</div>;

  _renderContext = () => {
    const name = this.props.route.name;
    switch (name) {
      case ALL_ROUTES:
        return <RouteList />;
      case ROUTE:
        return <StopList />;
      case DIRECTION:
        return <StopList />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <MapLayer />
        <NavBar />
        { this._renderContext() }
      </div>
    );
  }
}

const mapDispatchToProps = {
  getRoutes,
  getVehicles,
};

const mapStateToProps = (state) => ({
  globalError: state.ui.globalError,
  route: state.ui.route,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
