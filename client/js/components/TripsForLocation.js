import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default class TripsForLocation extends Component {
  render() {
    return (
      <div>
        <div>tripsForLocation loading? {this.props.loading ? 'loading' : 'done'}</div>
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
  };
}

export default connect(mapStateToProps)(TripsForLocation);
