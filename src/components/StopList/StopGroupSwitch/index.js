import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StopGroupType } from 'constants/OBAPropTypes';
import {
  stopGroupsForCurrentRouteSelector,
  currentStopGroupSelector,
} from 'selectors/oba';

import StopGroupSwitchItem from './StopGroupSwitchItem';

class StopList extends Component {
  static propTypes = {
    stopGroups: PropTypes.arrayOf(StopGroupType),
    currentStopGroup: StopGroupType,
    setCurrentStopGroup: PropTypes.func.isRequired,
  };

  render() {
    const { stopGroups, currentStopGroup } = this.props;

    const groupToggles = stopGroups.map((stopGroup) => (
      <StopGroupSwitchItem
        stopGroup={stopGroup}
        checked={stopGroup.id === currentStopGroup.id}
      />
    ));

    return (
      <div>{groupToggles}</div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentStopGroup: currentStopGroupSelector,
  stopGroups: stopGroupsForCurrentRouteSelector,
});

export default connect(mapStateToProps)(StopList);
