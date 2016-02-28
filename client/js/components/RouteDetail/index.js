import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {RouteType} from 'js/constants/OBAPropTypes';
import RouteMap from 'js/components/RouteMap';

class RouteDetail extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.route.shortName}</h1>
        <h2>{this.props.route.longName}</h2>
        <RouteMap routeId={this.props.route.id} />
      </div>
    );
  }
}

RouteDetail.propTypes = {
  route: RouteType.isRequired,
};

const currentRouteSelector = createSelector(
  (state) => state.data.routes,
  (state) => state.ui.currentRoute,
  (routes, routeId) => routes[routeId]
);


const mapStateToProps = createSelector(
  currentRouteSelector,
  (route) => {
    return {
      route,
    };
  }
);

export default connect(mapStateToProps)(RouteDetail);
