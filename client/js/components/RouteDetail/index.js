import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import toJS from 'immutable-to-js';
import {List, Map} from 'immutable';
import moment from 'moment-timezone';

import {RouteShape} from 'js/constants/PropTypes';
import Title from '../Title';
import TimeAgo from '../TimeAgo';
import RouteMap from './RouteMap';

import ScheduleDeviation from './ScheduleDeviation.js';

class RouteDetail extends Component {
  render() {
    return <div>Current route</div>;
  }
}

RouteDetail.propTypes = {
  route: RouteShape.isRequired,
};

const currentRouteSelector = createSelector(
  (state) => state.getIn(['data', 'routes']),
  (state) => state.getIn(['ui', 'currentRoute']),
  (routes, routeId) => routes.get(routeId)
);


const mapStateToProps = createSelector(
  currentRouteSelector,
  (route) => {
    return {route: route};
  }
);

export default connect(mapStateToProps)(RouteDetail);
