import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RouteType } from 'constants/OBAPropTypes';
import { setCurrentRoute } from 'actions';

class RouteItem extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    setCurrentRoute: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = () => {
      this.props.setCurrentRoute(this.props.route.id);
    };
  }

  render() {
    const { route } = this.props;
    return (
      <div key={route.id} onClick={this.onClick}>
        <b>{route.shortName}</b> - {route.longName}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrentRoute,
};

export default connect(null, mapDispatchToProps)(RouteItem);
