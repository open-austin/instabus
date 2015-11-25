import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default class Trip extends Component {
  render() {
    return (
      <div>
        {this.props.routeName},
        {this.props.routeShortName},
        {this.props.arrivalTime},
        {this.props.stopName},
      </div>
    );
  }
}

Trip.propTypes = {
  routeName: PropTypes.string,
  routeShortName: PropTypes.string,
  arrivalTime: PropTypes.number,
  stopName: PropTypes.string,
};
