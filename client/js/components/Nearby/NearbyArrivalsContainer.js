import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import {List} from 'immutable';
import {distanceBetweenCoords, formatDistanceBetweenCoords} from '../../libs/surf';

import {TripDetailShape} from '../../constants/PropTypes';
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
  arrivals: PropTypes.arrayOf(PropTypes.shape(TripDetailShape)),
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
  const userLatLng = state.getIn(['ui', 'userLatLng']).toJS();

  let arrivals = [];

  tripsForLocation.forEach((tripDetails) => {
    const tripId = tripDetails.get('tripId');
    const trip = state.getIn(['data', 'trips', tripId]);

    if (!trip) return;

    const routeId = trip.get('routeId');
    const route = state.getIn(['data', 'routes', routeId]);

    if (!route) return;

    const sortedStops = tripDetails.getIn(['schedule', 'stopTimes'], new List())
      .map(stopTime => state.getIn(['data', 'stops', stopTime.get('stopId')]))
      .sort((stopA, stopB) => distanceBetweenCoords(userLatLng, [stopA.get('lat'), stopA.get('lon')]) - distanceBetweenCoords(userLatLng, [stopB.get('lat'), stopB.get('lon')]));

    const nearestStop = sortedStops.first();
    const nearestStopId = nearestStop.get('id');

    if (!stop) return;

    const stopTime = tripDetails.getIn(['schedule', 'stopTimes']).find((x) => x.get('stopId') === nearestStopId);

    const arrivalTime = ((tripDetails.get('serviceDate') / 1000) + stopTime.get('arrivalTime')) * 1000;
    const arrivalMoment = moment(arrivalTime).tz(agencyTimezone);

    const arrival = {
      stopDistance: distanceBetweenCoords(userLatLng, [nearestStop.get('lat'), nearestStop.get('lon')]),
      formattedStopDistance: formatDistanceBetweenCoords(userLatLng, [nearestStop.get('lat'), nearestStop.get('lon')]),
      tripId: tripDetails.get('tripId'),
      arrivalTime: arrivalTime,
      arrivalMoment: arrivalMoment,
      routeLongName: route.get('longName'),
      routeShortName: route.get('shortName'),
      tripHeadsign: trip.get('tripHeadsign'),
      stopName: nearestStop.get('name'),
    };

    arrivals.push(arrival);
  });

  arrivals = arrivals.sort((a, b) => a.stopDistance - b.stopDistance);

  return {
    arrivals,
  };
}

export default connect(mapStateToProps)(NearbyArrivalsContainer);
