import React, {Component, PropTypes} from 'react';

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
