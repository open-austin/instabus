import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

export default class ErrorMessage extends Component {
  render() {
    if (!this.props.errorMessage) {
      return <div />;
    }
    return (
      <div>Error {this.props.errorMessage}</div>
    );
  }
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.getIn(['ui', 'errorMessage']),
  };
}

export default connect(mapStateToProps)(ErrorMessage);
