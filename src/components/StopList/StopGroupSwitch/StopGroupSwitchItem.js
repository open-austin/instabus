import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { StopGroupType } from 'constants/OBAPropTypes';
import { setCurrentStopGroup } from 'actions/ui';

class StopGroupSwitchItem extends Component {
  static propTypes = {
    stopGroup: StopGroupType.isRequired,
    checked: PropTypes.bool.isRequired,
    setCurrentStopGroup: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.setCurrentStopGroup = () => this.props.setCurrentStopGroup(this.props.stopGroup.id);
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

const mapDispatchToProps = {
  setCurrentStopGroup,
};

export default connect(null, mapDispatchToProps)(StopGroupSwitchItem);
