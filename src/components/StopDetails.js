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
    stopId: PropTypes.string.isrequired,
    stop: StopType,
  };

  render() {
    const {stop} = this.props;
    return (
      <div>
        <h1>{stop.name}</h1>

        <div>code: {stop.code}</div>
        <div>direction: {stop.direction}</div>
        <div>id: {stop.id}</div>
        <div>lat: {stop.lat}</div>
        <div>locationType: {stop.locationType}</div>
        <div>lon: {stop.lon}</div>
        <div>name: {stop.name}</div>
        <div>routes that stop here:
         {stop.routeIds}
        </div>
        <div>wheelchairBoarding: {stop.wheelchairBoarding}</div>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  stop: stopSelector,
});

export default connect(mapStateToProps)(Stop);
