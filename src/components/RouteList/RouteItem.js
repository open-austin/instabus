import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RouteType } from 'constants/OBAPropTypes';
import { setCurrentRoute, setCurrentTab } from 'actions/ui';


class RouteItem extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    setCurrentRoute: PropTypes.func.isRequired,
    setCurrentTab: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.showStops = () => {
      this.props.setCurrentRoute(this.props.route.id);
      this.props.setCurrentTab('StopList');
    };

    this.showMap = () => {
      this.props.setCurrentRoute(this.props.route.id);

      // FIXME: I'm not sure what to do here
      // Maybe just fill out more details in the background map?
      // this.props.setCurrentTab('RouteMap');
    };
  }

  render() {
    const { route } = this.props;
    return (
      <div key={route.id}>
        <b>{route.shortName}</b> - {route.longName}
        <button onClick={this.showStops}>Stops</button>
        <button onClick={this.showMap}>Map</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrentRoute,
  setCurrentTab,
};

export default connect(null, mapDispatchToProps)(RouteItem);
