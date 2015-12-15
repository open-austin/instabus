import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import toJS from 'immutable-to-js';

import {RouteShape} from '../../constants/PropTypes';
import {setRoute} from '../../redux/ui';
import Title from '../Title';
import RouteCard from './RouteCard';

export default class RouteListContainer extends Component {
  render() {
    const cards = this.props.routes.map((route) => (
      <RouteCard
        key={route.id}
        onClick={() => this.props.setRoute(route.id)}
        {...route}
      />
    ));

    return (
      <div className="container-responsive container-flush-both-xs">
        <Title>Routes</Title>
        <div className="row row-center">
          <div className="col xs-12 sm-10 md-8 lg-6 card-group">
            {cards}
          </div>
        </div>
      </div>
    );
  }
}

RouteListContainer.propTypes = {
  routes: PropTypes.arrayOf(RouteShape),
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const routesLookup = state.getIn(['data', 'routes'], Map());

  const routes = List(routesLookup.values())
    .sort((a, b) => +a.get('shortName') - +b.get('shortName'));

  return {
    routes: toJS(routes),
  };
}

const mapDispatchToProps = {
  setRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteListContainer);
