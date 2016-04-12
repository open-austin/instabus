import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GlobalHistory } from 'libs/routing';

import { RouteType, StopGroupType } from 'constants/OBAPropTypes';
import { setCurrentStopGroup } from 'actions/ui';

import styles from './styles.scss';

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
    const longName = stopGroup.name.name;
    let stopDirection;
    if (longName.indexOf('NB') > -1) {
      stopDirection = 'Northbound';
    }
    else if (longName.indexOf('SB') > -1) {
      stopDirection = 'Southbound';
    }
    else if (longName.indexOf('EB') > -1) {
      stopDirection = 'Eastbound';
    } 
    else if (longName.indexOf('WB') > -1) {
      stopDirection = 'Westbound';
    }
    else {
      stopDirection = longName;
    }
    return (
      <label htmlFor={inputId} className={styles.label}>
        <div className={styles.labelText}>
          {stopDirection}
        </div>
        <input
          className={styles.input}
          id={inputId}
          type="radio"
          checked={checked}
          onChange={this.setCurrentStopGroup}
        />
      </label>
    );
  }
}
