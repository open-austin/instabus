import React, { Component, PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import RouteList from 'routes/RouteList';
import TopBar from './TopBar';

import { CoordinatePointType } from 'constants/OBAPropTypes';
import { watchUserLocation } from 'app/actions';


class App extends Component {
  static propTypes = {
    userLocation: CoordinatePointType,
    watchUserLocation: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.watchUserLocation();
  }

  render() {
    return (
      <div>
        <TopBar />
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        {this.props.userLocation && `User is at ${this.props.userLocation.lat}, ${this.props.userLocation.lon}`}
        <RouteList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLocation: state.userLocation,
});

const mapDispatchToProps = {
  watchUserLocation,
};

export default cssmodules(connect(mapStateToProps, mapDispatchToProps)(App), styles);
