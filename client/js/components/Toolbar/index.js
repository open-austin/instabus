import React, {Component, PropTypes} from 'react';

import ToolbarButton from './ToolbarButton';

export default class Toolbar extends Component {
  isActive() {

  }

  render() {
    const buttons = this.props.items.map((name) => {
      const active = name === this.props.currentPage;
      return (
        <ToolbarButton
          key={name}
          onClick={() => this.props.setPage(name)}
          name={name}
          active={active}
        />
      );
    });

    return (
      <div className="toolbar scroll area-fixed ">
        <div className="row row-center">
          <div className="col xs-12 sm-6 md-4 btn-group center">
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};
