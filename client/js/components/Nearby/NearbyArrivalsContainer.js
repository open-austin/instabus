import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment-timezone';
import {List} from 'immutable';
import {distanceBetweenCoords, formatDistanceBetweenCoords} from '../../libs/surf';

import {TripDetailShape} from '../../constants/PropTypes';
import ArrivalCard from './ArrivalCard';


export default class NearbyArrivalsContainer extends Component {
  render() {
    const rows = this.props.groupedArrivals.map((groupedArrival) => {
      const arrivalElements = groupedArrival.arrivals.map((arrival) => <ArrivalCard {...arrival} key={arrival.tripId} />);
      return (
        <div className="trip card row row-nowrap" key={groupedArrival.routeShortName}>
          <h2>{groupedArrival.routeShortName}</h2>
          <h3>{groupedArrival.routeLongName}</h3>
          {arrivalElements}
        </div>
      );
    });

    return (
      <div className="col xs-12 sm-10 md-8 lg-6 card-group">
        {rows}
      </div>
    );
  }
}

NearbyArrivalsContainer.propTypes = {
  groupedArrivals: PropTypes.arrayOf(PropTypes.shape({
    routeShortName: PropTypes.string.isRequired,
    routeLongName: PropTypes.string.isRequired,
    arrivals: PropTypes.arrayOf(PropTypes.shape(TripDetailShape)).isRequired,
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
      groupedArrivals: [],
    };
  }

  const agencyTimezone = state.getIn(['data', 'agencies']).first().get('timezone');
  const userLatLng = state.getIn(['ui', 'userLatLng']).toJS();

  let arrivalsList = new List();

  tripsForLocation.forEach((tripDetails) => {
    const tripId = tripDetails.get('tripId');
    const trip = state.getIn(['data', 'trips', tripId]);

    if (!trip) return;

    const routeId = trip.get('routeId');
    const route = state.getIn(['data', 'routes', routeId]);

    if (!route) return;

    const distanceFromUserToStop = (stop) => distanceBetweenCoords(userLatLng, [stop.get('lat'), stop.get('lon')]);
    const sortedStops = tripDetails
      .getIn(['schedule', 'stopTimes'], new List())
      .map(stopTime => state.getIn(['data', 'stops', stopTime.get('stopId')]))
      .sort((stopA, stopB) => distanceFromUserToStop(stopA) - distanceFromUserToStop(stopB));

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

    arrivalsList = arrivalsList.push(arrival);
  });

  const minDistance = (arrivals) => arrivals.map(arrival => arrival.stopDistance).min();
  const compareArrivals = (arrivalsA, arrivalsB) => minDistance(arrivalsA) - minDistance(arrivalsB);
  const formatArrivalsGroup = (arrivals) => {
    return {
      routeShortName: arrivals.first().routeShortName,
      routeLongName: arrivals.first().routeLongName,
      arrivals: arrivals.toJS(),
    };
  };

  const groupedArrivals = arrivalsList
    .groupBy((arrival) => arrival.routeShortName)
    .toList()
    .sort(compareArrivals)
    .map(formatArrivalsGroup)
    .toJS();

  return {
    groupedArrivals,
  };
}

export default connect(mapStateToProps)(NearbyArrivalsContainer);
