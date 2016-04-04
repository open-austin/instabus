import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GlobalHistory } from 'libs/routing';

import { RouteType, StopGroupType } from 'constants/OBAPropTypes';
import { setCurrentStopGroup } from 'actions/ui';


export default class StopGroupSwitchItem extends Component {
  static propTypes = {
    stopGroup: StopGroupType.isRequired,
    routeId: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.setCurrentStopGroup = () => {
      const routeId = this.props.routeId;
      const stopGroupId = this.props.stopGroup.id;
      GlobalHistory.push(`/route/${routeId}/stop/${stopGroupId}`);
    };
  }

  render() {
    const { stopGroup, checked } = this.props;
    const inputId = `stop-group-switch-${stopGroup.id}`;
    return (
      <div>
        <label htmlFor={inputId}>{stopGroup.name.name}</label>
        <input
          id={inputId}
          type="radio"
          checked={checked}
          onChange={this.setCurrentStopGroup}
        />
      </div>
    );
  }
}
