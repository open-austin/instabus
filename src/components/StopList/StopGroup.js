import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StopGroupType } from 'constants/OBAPropTypes';
import { stopGroupSelector } from 'selectors/oba';

import Stop from 'components/StopList/Stop';

class StopGroup extends Component {
  static propTypes = {
    stopGroup: StopGroupType,

    routeId: PropTypes.string.isRequired,
  };

  render() {
    if (!this.props.stopGroup) {
      return null;
    }

    const stops = this.props.stopGroup.stopIds.map((stopId, i) => (
      <Stop stopId={stopId} key={i} />
    ));
    return (
      <div>
        <h1>{this.props.stopGroup.name.name}</h1>
        {stops}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  routeId: (state) => state.routing.routeId,
  stopGroup: stopGroupSelector,
});

export default connect(mapStateToProps)(StopGroup);
