import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

class RouteTrips extends Component {
  render() {
    const trips = this.props.trips.map((trip, i) => {
      return <li key={i}>{trip.tripHeadsign}</li>
    })
    return (
      <div className='upcomingTrips'>
        <h2>Upcoming Trips</h2>
        <ol className='upcomingTripsList'>
          {trips}
        </ol>
      </div>
    );
  }
}

RouteTrips.propTypes = {
  routeId: PropTypes.string.isRequired,
  // routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  // stops: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const tripsDetailsSelector = createSelector(
  (state, props) => state.data.routes[props.routeId],
  (state) => state.data.tripsDetailsForRoute,
  (route, TripsDetailsForRoute) => {
    if (!route) {
      return [];
    }
    return TripsDetailsForRoute[route.id] || [];
  }
);

const tripIdsSelector = createSelector(
  tripsDetailsSelector,
  (tripsDetails) => tripsDetails.map(tripDetails => tripDetails.tripId)
);

const tripsSelector = createSelector(
  tripIdsSelector,
  (state) => state.data.trips,
  (tripIds, trips) => tripIds.reduce((result, tripId) => {
    const trip = trips[tripId];
    if (trip) {
      return [...result, trip];
    }
    return result;
  }, [])
);

const mapStateToProps = createSelector(
  tripsSelector,
  (trips) => {
    return {
      trips,
    };
  }
);

export default connect(mapStateToProps)(RouteTrips);
