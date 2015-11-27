import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Toolbar extends Component {
  render() {
    const btnClass = classNames('btn btn-small btn-ghost', {
      'btn-active': this.props.active,
    });

    return (
      <button onClick={this.props.onClick} className={btnClass}>
        {this.props.name}
      </button>
    );
  }
}

Toolbar.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
