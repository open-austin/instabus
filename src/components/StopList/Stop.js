import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  StopType,
  RouteType,
} from 'constants/OBAPropTypes';
import StopRouteItem from 'components/StopList/StopRouteItem';


class Stop extends Component {
  static propTypes = {
    stopId: PropTypes.string.isRequired,
    stop: StopType,
    route: RouteType,
  };

  render() {
    const { stop } = this.props;
    if (!stop) {
      return null;
    }
    const routeItems = stop.routeIds.map((routeId, i) => (
      <StopRouteItem key={i} routeId={routeId} />
    ));

    return (
      <div>
        <div>{stop.name}</div>
        <div>routes that stop here</div>
        {routeItems}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stop: createSelector(
    (state) => state.oba.references.stops,
    (state, props) => props.stopId,
    (stops, stopId) => stops[stopId]
  ),
});

export default connect(mapStateToProps)(Stop);
