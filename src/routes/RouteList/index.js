import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { getAllRoutes } from 'routes/routeList/routeListActions';
import { RouteType } from 'constants/OBAPropTypes';
import RouteItem from 'routes/RouteItem';

class RouteList extends Component {
  static propTypes = {
    allRoutes: PropTypes.arrayOf(RouteType).isRequired,
    getAllRoutes: PropTypes.func.isRequired,
    allRoutesLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.getAllRoutes();
  }

  renderRoute(route, i) {
    return (
      <RouteItem route={route} key={i} />
    );
  }

  render() {
    const items = this.props.allRoutes.map(this.renderRoute);

    return (
      <div>
        <h1>Route List</h1>
        {this.props.allRoutesLoading && <div>Loading routes</div>}
        {items}
      </div>
    );
  }
}

export const sortedRoutesSelector = createSelector(
  (state) => state.routes.allRoutes,
  (routes) => _.sortBy(routes, ['shortName'])
);

const mapStateToProps = createStructuredSelector({
  allRoutes: sortedRoutesSelector,
  allRoutesLoading: (state) => state.routes.allRoutesLoading,
});

const mapDispatchToProps = {
  getAllRoutes,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
