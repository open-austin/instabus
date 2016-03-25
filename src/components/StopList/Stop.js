import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  StopType,
} from 'constants/OBAPropTypes';
import {
  stopSelector,
} from 'selectors/oba';

class Stop extends Component {
  static propTypes = {
    stopId: PropTypes.string.isRequired,
    stop: StopType.isRequired,
  };

  render() {
    const { stop } = this.props;
    return (
      <div>
        <div>{stop.name}</div>
        <div>routes that stop here: {stop.routeIds.map((routeId) => (<b>{routeId}</b>))}s</div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stop: stopSelector,
});

export default connect(mapStateToProps)(Stop);
