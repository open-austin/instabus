import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RouteType } from 'constants/OBAPropTypes';
import { getRoutesForAgency } from 'actions/oba/routes';
import { sortedRoutesSelector } from 'selectors/oba';
import RouteItem from 'components/RouteList/RouteItem';
import { ROUTE_LIST_TAB } from 'constants/TabNames';

class RouteList extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(RouteType).isRequired,
    getRoutesForAgency: PropTypes.func.isRequired,
    routesForAgencyLoading: PropTypes.bool.isRequired,
  };

  static TAB_NAME = ROUTE_LIST_TAB.name;

  componentWillMount() {
    this.props.getRoutesForAgency();
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
        {this.props.routesForAgencyLoading && <div>Loading routes</div>}
        {items}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  routes: sortedRoutesSelector,
  routesForAgencyLoading: (state) => state.ui.loading.routesForAgencyLoading,
});

const mapDispatchToProps = {
  getRoutesForAgency,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
