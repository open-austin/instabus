import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {RouteType} from 'js/constants/PropTypes';
import RouteCard from './RouteCard';
import RouteMap from './RouteMap';
import {setRoute} from '../../redux/ui';


export default class RoutesContainer extends Component {
  render() {
    if (this.props.currentRoute) {
      return <RouteMap {...this.props.currentRoute} />;
    }

    const cards = this.props.routes.map((route) => (
      <RouteCard
        key={route.id}
        onClick={() => this.props.setRoute(route.id)}
        {...route}
      />
    ));

    return (
      <div className="col xs-12 sm-10 md-8 lg-6 card-group">
        {cards}
      </div>
    );
  }
}

RoutesContainer.propTypes = {
  currentRoute: RouteType,
  routes: PropTypes.arrayOf(RouteType),
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const routesLookup = state.data.routes;

  const routes = _.values(routesLookup)
    .sort((a, b) => +a.shortName - +b.shortName);

  const currentRouteId = state.ui.route;
  const currentRoute = routesLookup[currentRouteId];

  return {
    currentRoute,
    routes,
  };
}

const mapDispatchToProps = {
  setRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
