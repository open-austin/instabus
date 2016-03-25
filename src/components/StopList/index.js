import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getStopsForRoute } from 'actions/oba';
import {
  RouteType,
  StopGroupType,
} from 'constants/OBAPropTypes';
import {
  stopGroupsForCurrentRouteSelector,
  currentRouteSelector,
} from 'selectors/oba';

import StopGroup from 'components/StopList/StopGroup';

class StopList extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    stopGroups: PropTypes.arrayOf(StopGroupType),
    getStopsForRoute: PropTypes.func.isRequired,
    stopsForRouteLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.getStopsForRoute(this.props.route.id);
  }

  render() {
    const groups = this.props.stopGroups.map((stopGroup) => (
      <StopGroup stopGroupId={stopGroup.id} />
    ));

    return (
      <div>
        <h1>Stop List</h1>
        {this.props.stopsForRouteLoading && <div>Loading Stop List</div>}
        {groups}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stopGroups: stopGroupsForCurrentRouteSelector,
  route: currentRouteSelector,
  stopsForRouteLoading: (state) => state.loading.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
