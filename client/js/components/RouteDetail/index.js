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
        <RouteMap />
      </div>
    );
  }
}

RouteDetail.propTypes = {
  route: RouteType.isRequired,
};

const currentRouteSelector = createSelector(
  (state) => state.getIn(['data', 'routes']),
  (state) => state.getIn(['ui', 'currentRoute']),
  (routes, routeId) => routes.get(routeId)
);


const mapStateToProps = createSelector(
  currentRouteSelector,
  (route) => {
    return {
      route: route.toJS(),
    };
  }
);

export default connect(mapStateToProps)(RouteDetail);
