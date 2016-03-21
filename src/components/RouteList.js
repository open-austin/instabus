import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import RouteItem from 'components/RouteItem';
import { RouteType } from 'constants/OBAPropTypes';
import { getAllRoutes } from 'actions/oba';
import { sortedRoutesSelector } from 'selectors/oba';

class RouteList extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(RouteType).isRequired,
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
    const items = this.props.routes.map(this.renderRoute);

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
  routes: sortedRoutesSelector,
  allRoutesLoading: (state) => state.loading.allRoutesLoading,
});

const mapDispatchToProps = {
  getAllRoutes,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
