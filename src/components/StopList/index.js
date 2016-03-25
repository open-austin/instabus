import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  RouteType,
  StopGroupType,
} from 'constants/OBAPropTypes';
import { getStopsForRoute } from 'actions/oba';
import {
  currentRouteSelector,
  currentStopGroupSelector,
} from 'selectors/oba';

import StopGroupSwitch from 'components/StopList/StopGroupSwitch';
import StopGroup from 'components/StopList/StopGroup';

class StopList extends Component {
  static propTypes = {
    stopsForRouteLoading: PropTypes.bool.isRequired,

    currentStopGroup: StopGroupType,

    route: RouteType.isRequired,
    getStopsForRoute: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.getStopsForRoute(this.props.route.id);
  }

  render() {
    const { currentStopGroup, stopsForRouteLoading } = this.props;

    if (stopsForRouteLoading) {
      return <div>Loading</div>;
    }


    return (
      <div>
        <h1>Stop List</h1>
        {stopsForRouteLoading && <div>Loading Stop List</div>}
        <StopGroupSwitch />
        {currentStopGroup && <StopGroup stopGroupId={currentStopGroup.id} />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentStopGroup: currentStopGroupSelector,
  route: currentRouteSelector,
  stopsForRouteLoading: (state) => state.ui.loading.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
