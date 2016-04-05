import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { StopType, CoordinatePointType } from 'constants/OBAPropTypes';
import { getNearbyTrips } from 'actions/oba/nearby';
import { stopsInMapSelector, arrivalsInMapSelector } from 'selectors/oba';

import { NEARBY_TAB } from 'constants/TabNames';

class Nearby extends Component {
  static propTypes = {
    getNearbyTrips: PropTypes.func.isRequired,
    nearbyStops: PropTypes.arrayOf(StopType).isRequired,
    nearbyArrivals: PropTypes.arrayOf(StopType).isRequired,
    nearbyTripsLoading: PropTypes.bool.isRequired,
    map: PropTypes.object,  // FIXME: Turn this into a type
  }

  static TAB_NAME = NEARBY_TAB.name;

  componentWillMount() {
    this.props.getNearbyTrips();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.map !== nextProps.map) {
      this.props.getNearbyTrips();
    }
  }

  render() {
    return (
      <div>
        <h1>Nearby Trips</h1>
        <div>Loading: {JSON.stringify(this.props.nearbyTripsLoading)}</div>
        <div>Nearby stops count: {this.props.nearbyStops.length}</div>
        <div>Nearby arrivals count: {JSON.stringify(this.props.nearbyArrivals.length)}</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nearbyTripsLoading: (state) => state.ui.loading.nearbyTripsLoading,
  nearbyStops: stopsInMapSelector,
  nearbyArrivals: arrivalsInMapSelector,
  map: (state) => state.ui.map,
});

const mapDispatchToProps = {
  getNearbyTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);
