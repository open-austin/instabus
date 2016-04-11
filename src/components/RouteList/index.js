import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RouteType } from 'constants/OBAPropTypes';
import { ROUTE_LIST_TAB } from 'constants/TabNames';
import { getRoutesForAgency } from 'actions/oba/routes';
import { sortedRoutesSelector } from 'selectors/oba';

import Spinner from 'components/Spinner';
import RouteItem from 'components/RouteList/RouteItem';

class RouteList extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(RouteType).isRequired,
    getRoutesForAgency: PropTypes.func.isRequired,
    routesForAgencyLoading: PropTypes.bool.isRequired,
  };

  static TAB_NAME = ROUTE_LIST_TAB.name;

  componentDidMount() {
    setTimeout(() => this.props.getRoutesForAgency(), 100);
  }

  renderRoute(route, i) {
    return (
      <RouteItem route={route} key={i} />
    );
  }

  renderRoutes = () => {
    if (this.props.routesForAgencyLoading) {
      return (
        <Spinner />
      );
    }

    return this.props.routes.map(this.renderRoute);
  }

  render() {
    return (
      <div>
        { this.renderRoutes() }
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
