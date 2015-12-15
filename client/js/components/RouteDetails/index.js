import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import toJS from 'immutable-to-js';
import {List, Map} from 'immutable';
import moment from 'moment-timezone';

import {TripDetailShape} from '../../constants/PropTypes';
import Title from '../Title';
import TimeAgo from '../TimeAgo';
import RouteMap from './RouteMap';

import ScheduleDeviation from './ScheduleDeviation.js';

export default class RouteDetails extends Component {
  render() {
    if (this.props.loading) {
      return <div>Loading</div>;
    }

    const selectedRouteTrips = this.props.routeTrips.map((trip) => (
      <div className="card row row-nowrap" key={trip.id}>
        <div><b>{trip.tripHeadsign}</b></div>
        <div>Next stop: {trip.nextStopName} in <TimeAgo moment={trip.nextStopArrivalMoment} /></div>
        <ScheduleDeviation scheduleDeviation={trip.scheduleDeviation} />
      </div>
    ));

    const otherRoutesTrips = this.props.relatedTrips.map((trip) => (
      <div className="card row row-nowrap" key={trip.id}>
        <div><b>{trip.routeShortName} {trip.routeLongName}</b></div>
        <div><b>{trip.tripHeadsign}</b></div>
        <div>Next stop: {trip.nextStopName} in <TimeAgo moment={trip.nextStopArrivalMoment} /></div>
        <ScheduleDeviation scheduleDeviation={trip.scheduleDeviation} />
      </div>
    ));

    return (
      <div className="container-responsive container-flush-both-xs">
        <Title>Route {this.props.routeShortName}</Title>
        <div className="row row-center">
          <div className="col xs-12 sm-10 md-8 lg-6 card-group">
            <button>Map</button>
            <h2>Current trips</h2>
            {selectedRouteTrips}
            <h2>Related trips</h2>
            {otherRoutesTrips}
          </div>
        </div>
      </div>
    );
  }
}

RouteDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  routeShortName: PropTypes.string,
  routeTrips: PropTypes.arrayOf(PropTypes.shape(TripDetailShape)),
  relatedTrips: PropTypes.arrayOf(PropTypes.shape(TripDetailShape)),
};

function mapStateToProps(state) {
  let loading = false;
  let routeTrips = [];
  let relatedTrips = [];

  if (
    !state.getIn(['data', 'agencies']).count() ||
    !state.getIn(['data', 'stops']).count() ||
    !state.getIn(['data', 'trips']).count() ||
    !state.getIn(['data', 'routes']).count()
  ) {
    console.log('not ready yet');
    return {
      loading: true,
      routeTrips,
      relatedTrips,
    };
  }

  const selectedRouteId = state.getIn(['ui', 'route']);
  const agencyTimezone = state.getIn(['data', 'agencies']).first().get('timezone');

  state.getIn(['data', 'tripsForRoute']).forEach(tripDetails => {
    const tripId = tripDetails.get('tripId');
    const trip = state.getIn(['data', 'trips', tripId]);
    if (!trip) return;
    const routeId = trip.get('routeId');
    const route = state.getIn(['data', 'routes', routeId], new Map());
    const nextStopId = tripDetails.getIn(['status', 'nextStop']);
    const nextStop = state.getIn(['data', 'stops', nextStopId], new Map());
    const closestStopId = tripDetails.getIn(['status', 'closestStop']);
    const closestStop = state.getIn(['data', 'stops', closestStopId], new Map());

    const nextStopTime = tripDetails.getIn(['schedule', 'stopTimes']).find((x) => x.get('stopId') === nextStopId);
    const nextStopArrivalMoment = moment(((tripDetails.get('serviceDate') / 1000) + nextStopTime.get('arrivalTime')) * 1000).tz(agencyTimezone);

    const closestStopTime = tripDetails.getIn(['schedule', 'stopTimes']).find((x) => x.get('stopId') === closestStopId);
    const closestStopArrivalMoment = moment(((tripDetails.get('serviceDate') / 1000) + closestStopTime.get('arrivalTime')) * 1000).tz(agencyTimezone);

    const data = {
      routeLongName: route.get('longName'),
      routeShortName: route.get('shortName'),
      tripHeadsign: trip.get('tripHeadsign'),
      nextStopName: nextStop.get('name'),
      nextStopArrivalMoment: nextStopArrivalMoment,
      closestStopName: closestStop.get('name'),
      closestStopArrivalMoment: closestStopArrivalMoment,
      scheduleDeviation: tripDetails.getIn(['status', 'scheduleDeviation']),
    };

    if (routeId === selectedRouteId) {
      routeTrips.push(data);
    } else {
      relatedTrips.push(data);
    }
  });

  relatedTrips = relatedTrips.sort((a, b) => Number(a.routeShortName) >= Number(b.routeShortName));

  const selectedRoute = state.getIn(['data', 'routes', selectedRouteId]);
  const routeShortName = selectedRoute.get('routeShortName');

  return {
    loading,
    routeShortName,
    routeTrips,
    relatedTrips,
  };
}

export default connect(mapStateToProps)(RouteDetails);
