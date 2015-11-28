import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment-timezone';

import {ArrivalShape} from '../../constants/PropTypes';
import ArrivalCard from './ArrivalCard';


export default class NearbyArrivalsContainer extends Component {
  render() {
    const cards = this.props.arrivals.map((arrival) => <ArrivalCard {...arrival} key={arrival.tripId} />);

    return (
      <div className="col xs-12 sm-10 md-8 lg-6 card-group">
        {cards}
      </div>
    );
  }
}

NearbyArrivalsContainer.propTypes = {
  arrivals: PropTypes.arrayOf(ArrivalShape),
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
      arrivals: [],
    };
  }

  const agencyTimezone = state.getIn(['data', 'agencies']).first().get('timezone');

  let arrivals = [];

  tripsForLocation.forEach((tripDetails) => {
    const tripId = tripDetails.get('tripId');
    const trip = state.getIn(['data', 'trips', tripId]);

    if (!trip) return;

    const routeId = trip.get('routeId');
    const route = state.getIn(['data', 'routes', routeId]);

    if (!route) return;

    // fixme: choose the stop closest to the user
    const stopId = tripDetails.getIn(['status', 'closestStop']);
    const stop = state.getIn(['data', 'stops', stopId]);

    if (!stop) return;

    const stopTime = tripDetails.getIn(['schedule', 'stopTimes']).find((x) => x.get('stopId') === stopId);

    const arrivalTime = ((tripDetails.get('serviceDate') / 1000) + stopTime.get('arrivalTime')) * 1000;
    const arrivalMoment = moment(arrivalTime).tz(agencyTimezone);

    const arrival = {
      tripId: tripDetails.get('tripId'),
      arrivalMoment: arrivalMoment,
      routeLongName: route.get('longName'),
      routeShortName: route.get('shortName'),
      tripHeadsign: trip.get('tripHeadsign'),
      stopName: stop.get('name'),
    };

    arrivals.push(arrival);
  });

  return {
    arrivals,
  };
}

export default connect(mapStateToProps)(NearbyArrivalsContainer);
