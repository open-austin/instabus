import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getStopsForRoute } from 'stops/StopList/stopListActions';
import { StopType } from 'constants/OBAPropTypes';
import { stopListSelector } from 'stops/StopList/stopListSelectors';

class StopList extends Component {
  static propTypes = {
    routeId: PropTypes.string.isRequired,
    stopsForRoute: PropTypes.arrayOf(StopType).isRequired,
    getStopsForRoute: PropTypes.func.isRequired,
    stopsForRouteLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.getStopsForRoute(this.props.routeId);
  }

  renderStop(stop) {
    return (
      <div key={stop.id}>
        {stop.name}
      </div>
    );
  }

  render() {
    const items = this.props.stopsForRoute.map(this.renderStop);

    return (
      <div>
        <h1>Stop List</h1>
        {this.props.stopsForRouteLoading && <div>Loading Stop List</div>}
        {items}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stopsForRoute: stopListSelector,
  stopsForRouteLoading: (state) => state.stops.stopList.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
