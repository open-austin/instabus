import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StopGroupType } from 'constants/OBAPropTypes';
import { stopGroupsForCurrentRouteSelector } from 'selectors/oba';

import StopGroupSwitchItem from './StopGroupSwitchItem';


class StopGroupSwitch extends Component {
  static propTypes = {
    stopGroups: PropTypes.arrayOf(StopGroupType),
    currentStopGroupId: PropTypes.string,
    routeId: PropTypes.string.isRequired,
  };

  render() {
    const { stopGroups, currentStopGroupId, routeId } = this.props;

    const groupToggles = stopGroups.map((stopGroup, i) => (
      <StopGroupSwitchItem
        key={i}
        stopGroup={stopGroup}
        routeId={routeId}
        checked={!!currentStopGroupId ? stopGroup.id === currentStopGroupId : false}
      />
    ));

    return (
      <div>{groupToggles}</div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentStopGroupId: (state) => state.routing.stopGroupId,
  routeId: (state) => state.routing.routeId,
  stopGroups: stopGroupsForCurrentRouteSelector,
});

export default connect(mapStateToProps)(StopGroupSwitch);
