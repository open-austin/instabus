import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  StopType,
  RouteType,
} from 'constants/OBAPropTypes';
import {
  stopSelector,
} from 'selectors/oba';
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
    const routeItems = stop.routeIds.map((routeId) => (
      <StopRouteItem routeId={routeId} />
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
  stop: stopSelector,
});

export default connect(mapStateToProps)(Stop);
