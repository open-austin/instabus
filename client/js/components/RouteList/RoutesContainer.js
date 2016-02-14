import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import toJS from 'immutable-to-js';

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
  const routesLookup = state.getIn(['data', 'routes'], Map());

  const routes = List(routesLookup.values())
    .sort((a, b) => +a.get('shortName') - +b.get('shortName'));

  const currentRouteId = state.getIn(['ui', 'route']);
  const currentRoute = routesLookup.get(currentRouteId);

  return {
    currentRoute: toJS(currentRoute),
    routes: toJS(routes),
  };
}

const mapDispatchToProps = {
  setRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);
