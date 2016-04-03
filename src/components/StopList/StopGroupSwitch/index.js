import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StopGroupType, RouteType } from 'constants/OBAPropTypes';
import {
  stopGroupsForCurrentRouteSelector,
  currentStopGroupSelector,
  currentRouteSelector,
} from 'selectors/oba';

import StopGroupSwitchItem from './StopGroupSwitchItem';


class StopGroupSwitch extends Component {
  static propTypes = {
    stopGroups: PropTypes.arrayOf(StopGroupType),
    currentStopGroup: StopGroupType,
    route: RouteType.isRequired,

    params: PropTypes.shape({
      routeId: PropTypes.string.isRequired,
      stopGroupId: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { stopGroups, currentStopGroup, route } = this.props;

    const groupToggles = stopGroups.map((stopGroup, i) => (
      <StopGroupSwitchItem
        key={i}
        stopGroup={stopGroup}
        routeId={route.id}
        checked={!currentStopGroup ? false : stopGroup.id === currentStopGroup.id}
      />
    ));

    return (
      <div>stop groups {groupToggles}</div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentStopGroup: currentStopGroupSelector,
  route: currentRouteSelector,
  stopGroups: stopGroupsForCurrentRouteSelector,
});

export default connect(mapStateToProps)(StopGroupSwitch);
