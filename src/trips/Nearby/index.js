import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getNearbyTrips } from 'trips/Nearby/nearbyActions';
import { TripType } from 'constants/OBAPropTypes';
import { nearbyTripsSelector } from 'trips/Nearby/nearbySelectors';

class NearbyTrips extends Component {
  static propTypes = {
    nearbyTrips: PropTypes.arrayOf(TripType).isRequired,
    getNearbyTrips: PropTypes.func.isRequired,
    nearbyTripsLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.getNearbyTrips();
  }

  renderTrip(trip) {
    return (
      <div key={trip.id}>
        <b>{trip.id}</b>
      </div>
    );
  }

  render() {
    const items = this.props.nearbyTrips.map(this.renderTrip);

    return (
      <div>
        <h1>Route List</h1>
        {this.props.nearbyTripsLoading && <div>Loading trips</div>}
        {items}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nearbyTrips: nearbyTripsSelector,
  nearbyTripsLoading: (state) => state.trips.nearbyTripsLoading,
});

const mapDispatchToProps = {
  getNearbyTrips,
};

export default connect(mapStateToProps, mapDispatchToProps)(NearbyTrips);
