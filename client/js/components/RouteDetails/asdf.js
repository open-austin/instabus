import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import toJS from 'immutable-to-js';
import {List, Map} from 'immutable';
import moment from 'moment-timezone';

import {RouteShape} from '../../constants/PropTypes';
import Title from '../Title';
import TimeAgo from '../TimeAgo';
import RouteMap from './RouteMap';

export default class RouteDetails extends Component {
  render() {
    if (!this.props.route || !this.props.arrivals) {
      return <div>Loading</div>;
    }

    const trips = this.props.arrivals.map((arrival) => {
      return (
        <div className="trip card row row-nowrap" key={arrival.get('tripId')}>
          <div className="col col-fill">
            <h3>{arrival.getIn(['route', 'shortName'])}</h3>
            <h4>{arrival.get('tripHeadsign')}</h4>
            <h6>{arrival.get('nextStopName')}</h6>
            <div>{arrival.get('nextStopArrivalMoment').format('h:mm:ss a z')}</div>
          </div>
          <div className="col">
            <h2 className=""><span className="text-tall">
              <TimeAgo moment={arrival.get('nextStopArrivalMoment')} interval={15 * 1000} />
            </span></h2>
          </div>
        </div>
      );
    });

    return (
      <div>
        <Title>{this.props.route.shortName} {this.props.route.longName}</Title>
        {trips}
      </div>
    );
  }
}

RouteDetails.propTypes = {
  userLatLng: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
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
  const tripsForRoute = state.getIn(['data', 'tripsForRoute'], new List());

  try {
    let tripIds = store.getState().getIn(['data', 'tripsForRoute']).map(x => x.getIn(['status', 'activeTripId'])).toJS()
    let routeIds = tripIds.map((tripId) => state.getIn(['data', 'trips', tripId])).map((trip) => trip.get('routeId'));
    console.log('tripIds', tripIds);
    console.log('fu', routeIds);
    debugger;
  }
  catch (e) {
  }

  let arrivals = new List();

  tripsForRoute.forEach((tripDetails) => {
    const tripId = tripDetails.get('tripId');
    const trip = state.getIn(['data', 'trips', tripId]);

    if (!trip) return;

    const nextStopId = tripDetails.getIn(['status', 'nextStop']);
    const nextStop = state.getIn(['data', 'stops', nextStopId]);

    // FIXME: next stop could be missing, and we should still show the trip
    if (!nextStop) return;
    const nextStopTime = tripDetails.get('serviceDate') + tripDetails.getIn(['status', 'nextStopTimeOffset']);
    const nextStopArrivalMoment = moment(nextStopTime).tz(agencyTimezone);

    const routeId = trip.get('routeId');
    const route = state.getIn(['data', 'routes', routeId]);

    const arrival = Map({
      route: route,
      tripId: tripDetails.get('tripId'),
      tripHeadsign: trip.get('tripHeadsign'),
      nextStopArrivalMoment: nextStopArrivalMoment,
      nextStopName: nextStop.get('name'),
    });

    arrivals = arrivals.push(arrival);
  });


  return {
    arrivals: arrivals,
    userLatLng: state.getIn(['ui', 'userLatLng']).toJS(),
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetails);
