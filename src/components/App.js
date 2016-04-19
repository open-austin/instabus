import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';

import MapLayer from 'components/Map';
import RouteList from 'components/RouteList';
import StopList from 'components/StopList';
import NavBar from 'components/NavBar';

import { getRoutes } from 'actions/oba';

class App extends Component {
  static propTypes = {
    globalError: PropTypes.string,
    route: PropTypes.object,
    getRoutes: PropTypes.func,
  }

  componentDidMount() {
    this.props.getRoutes();
  }

  componentWillUnmount() {

  }

  _renderGlobalError = () => <div>{this.props.globalError}</div>;

  _renderContext = () => {
    const name = this.props.route.name;
    switch (name) {
      case 'routes':
        return <RouteList />;
      case 'route':
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
};

const mapStateToProps = (state) => ({
  globalError: state.ui.globalError,
  route: state.ui.route,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
