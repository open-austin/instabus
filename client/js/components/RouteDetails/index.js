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
    return <div>Loading</div>;
  }
}

function mapStateToProps(state) {
  if (
    state.getIn(['data', 'trips']).count() &&
    state.getIn(['data', 'routes']).count() &&
    state.getIn(['data', 'tripsForRoute']).count()
  ) {
    const tripIds = state.getIn(['data', 'tripsForRoute']).map(trip => trip.get('tripId'));
    console.log('tripIds', tripIds);
    const trips = tripIds.map((tripId) => state.getIn(['data', 'trips', tripId], Map()));
    console.log('trips', trips);
    const routeIds = trips.map((trip) => trip.get('routeId'));
    console.log('routeIds', routeIds.toJS());
  }

  return {};
}

export default connect(mapStateToProps)(RouteDetails);
