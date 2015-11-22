import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default class TripsForLocation extends Component {
  render() {

    const wef = this.props.tripsForLocation.map((trip) => {
      return <div key={trip.tripId}>{trip.tripId}</div>
    });
    return (
      <div>
        <div>tripsForLocation loading? {this.props.loading ? 'loading' : 'done'}</div>
        {wef}
      </div>
    );
  }
}

TripsForLocation.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.getIn(['ui', 'tripsForLocation', 'loading']),
    tripsForLocation: state.getIn(['data', 'tripsForLocation']),
  };
}

export default connect(mapStateToProps)(TripsForLocation);
