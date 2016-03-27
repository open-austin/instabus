import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RouteType } from 'constants/OBAPropTypes';
import { setCurrentRoute } from 'actions/ui';


class RouteItem extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    setCurrentRoute: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.setCurrentRoute = () => {
      this.props.setCurrentRoute(this.props.route.id);
    };
  }

  render() {
    const { route } = this.props;
    return (
      <div key={route.id}>
        <b>{route.shortName}</b> - {route.longName}
        <button onClick={this.setCurrentRoute}>Set Current Route to {route.shortName}</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrentRoute,
};

export default connect(null, mapDispatchToProps)(RouteItem);
