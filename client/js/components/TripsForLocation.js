import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment-timezone';

import TimeAgo from './TimeAgo';



export default class TripsForLocation extends Component {
  render() {
    const wef = this.props.trips.map((trip) => {
      return (
        <div className="trip" key={trip.tripId}>
          <div>{trip.arrivalMoment.format('h:mm:ss a z')}</div>
          <TimeAgo moment={trip.arrivalMoment} interval={15 * 1000} />
          <div>{trip.routeLongName}</div>
          <div>{trip.routeShortName}</div>
          <div>{trip.tripHeadsign}</div>
          <div>{trip.stopName}</div>
        </div>
      );
    });
    return (
      <div>
        <div>trips loading? {this.props.loading ? 'loading' : 'done'}</div>
        {wef}
      </div>
    );
  }
}

TripsForLocation.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.shape({
    tripId: PropTypes.string,
    arrivalMoment: PropTypes.func,
    routeShortName: PropTypes.string,
    routeLongName: PropTypes.string,
    tripHeadsign: PropTypes.string,
    stopName: PropTypes.string,
  })),
};

function mapStateToProps(state) {
  console.log('recomputing');

  const tripsForLocation = state.getIn(['data', 'tripsForLocation']);

  if (
    !state.getIn(['data', 'agencies']).count() ||
    !state.getIn(['data', 'stops']).count() ||
    !state.getIn(['data', 'trips']).count() ||
    !state.getIn(['data', 'routes']).count()
  ) {
    console.log('not ready yet');
    return {
      trips: [],
    };
  }

  const agencyTimezone = state.getIn(['data', 'agencies']).first().get('timezone');

  const trips = tripsForLocation.map((tripForLocation) => {
    const tripId = tripForLocation.tripId;
    const trip = state.getIn(['data', 'trips', tripId]);

    const routeId = trip.get('routeId');
    const route = state.getIn(['data', 'routes', routeId]);

    // fixme: choose the stop closest to the user
    const stopId = tripForLocation.status.closestStop;
    const stop = state.getIn(['data', 'stops', stopId]);

    const stopTime = tripForLocation.schedule.stopTimes.find((x) => x.stopId === stopId);

    const arrivalTime = ((tripForLocation.serviceDate / 1000) + stopTime.arrivalTime) * 1000;
    const arrivalMoment = moment(arrivalTime).tz(agencyTimezone);

    return {
      tripId: tripForLocation.tripId,
      arrivalMoment: arrivalMoment,
      routeLongName: route.get('longName'),
      routeShortName: route.get('shortName'),
      tripHeadsign: trip.get('tripHeadsign'),
      stopName: stop.get('name'),
    };
  });

  return {
    trips,
  };
}

export default connect(mapStateToProps)(TripsForLocation);
