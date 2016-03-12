import React, { Component, PropTypes } from 'react';
import cssmodules from 'react-css-modules';
import { connect } from 'react-redux';

import styles from 'styles/base.scss';
import RouteList from 'routes/RouteList';
import NearbyTrips from 'trips/Nearby';
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
    const {
      userLocation,
    } = this.props;
    return (
      <div>
        { /* <TopBar /> */ }
        { userLocation && `User is at ${userLocation.lat}, ${userLocation.lon}` }
        { userLocation && <NearbyTrips location={userLocation} /> }
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
