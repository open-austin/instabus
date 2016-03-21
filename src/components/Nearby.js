import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { getNearbyTrips } from 'trips/Nearby/NearbyActions';
import { TripDetailsType, CoordinatePointType } from 'constants/OBAPropTypes';


class NearbyTrips extends Component {
  static propTypes = {
    userLocation: CoordinatePointType,
    nearbyTrips: PropTypes.arrayOf(TripDetailsType).isRequired,
    getNearbyTrips: PropTypes.func.isRequired,
    nearbyTripsLoading: PropTypes.bool.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.userLocation && this.props.userLocation) {
      this.props.getNearbyTrips(this.props.userLocation);
    }
  }

  renderTrip(trip) {
    return (
      <div key={trip.tripId}>
        <b>{trip.tripId}</b>
      </div>
    );
  }

  render() {
    if (this.props.userLocation) {
      const items = this.props.nearbyTrips.map(this.renderTrip);
      return (
        <div>
          <h1>Nearby Trips</h1>
          {this.props.nearbyTripsLoading && <div>Loading trips</div>}
          {items}
        </div>
      );
    }

    return (
      <div>
        <h1>Nearby Trips</h1>
        {this.props.nearbyTripsLoading && <div>Loading trips</div>}
      </div>
    );
  }
}

export const nearbyTripsSelector = createSelector(
  (state) => state.trips.nearbyTrips,
  (trips) => _.sortBy(trips, ['id'])
);

const mapStateToProps = createStructuredSelector({
  userLocation: (state) => state.userLocation,
  nearbyTrips: nearbyTripsSelector,
  nearbyTripsLoading: (state) => state.trips.nearbyTripsLoading,
});

const mapDispatchToProps = {
  getNearbyTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(NearbyTrips);
