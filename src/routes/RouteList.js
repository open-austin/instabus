import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getAllRoutes } from 'routes/RouteListActions';
import { RouteType } from 'constants/OBAPropTypes';
import { sortedRoutesSelector } from 'routes/routesSelectors';

class RouteList extends Component {
  static propTypes = {
    allRoutes: PropTypes.arrayOf(RouteType).isRequired,
    getAllRoutes: PropTypes.func.isRequired,
    allRoutesLoading: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.getAllRoutes();
  }

  renderRoute(route) {
    return (
      <div key={route.id}>
        <b>{route.shortName}</b> - {route.longName}
      </div>
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

const mapStateToProps = createStructuredSelector({
  allRoutes: sortedRoutesSelector,
  allRoutesLoading: (state) => state.routes.allRoutesLoading,
});

const mapDispatchToProps = {
  getAllRoutes,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
