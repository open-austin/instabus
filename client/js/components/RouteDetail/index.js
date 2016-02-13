import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {RouteType} from 'js/constants/OBAPropTypes';

class RouteDetail extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.route.shortName}</h1>
        <h2>{this.props.route.longName}</h2>
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
    console.log('calc');
    return {
      route: route.toJS(),
    };
  }
);

export default connect(mapStateToProps)(RouteDetail);
