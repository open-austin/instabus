import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { getStopsForRoute } from 'stops/StopList/StopListActions';
import { StopType, RouteType } from 'constants/OBAPropTypes';

class StopList extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    stops: PropTypes.arrayOf(StopType),
    getStopsForRoute: PropTypes.func.isRequired,
    stopsForRouteLoading: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps() {
    if (!this.props.stops) {
      this.props.getStopsForRoute(this.props.route.id);
    }
  }

  renderStop(stop) {
    return (
      <div key={stop.id}>
        {stop.name}
      </div>
    );
  }

  render() {
    const items = this.props.stops.map(this.renderStop);

    return (
      <div>
        <h1>Stop List</h1>
        {this.props.stopsForRouteLoading && <div>Loading Stop List</div>}
        {items}
      </div>
    );
  }
}

export const currentRouteSelector = createSelector(
  (state) => state.currentRoute,
  (state) => state.routes.allRoutes,
  (currentRoute, allRoutes) => allRoutes[currentRoute]
);

export const stopsForRouteSelector = createSelector(
  (state) => state.stops.stopsForRoute,
  (state) => state.currentRoute,
  (stopsForRoute, currentRoute) => stopsForRoute[currentRoute]
);

export const stopListSelector = createSelector(
  stopsForRouteSelector,
  (stops) => _.sortBy(stops, ['id'])
);

const mapStateToProps = createStructuredSelector({
  route: currentRouteSelector,
  stops: stopListSelector,
  stopsForRouteLoading: (state) => state.stops.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
