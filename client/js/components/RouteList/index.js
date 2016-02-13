import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {RouteType} from 'js/constants/OBAPropTypes';
import RouteListItem from './RouteListItem';

export default class RouteListContainer extends Component {

  render() {
    const items = this.props.routes.map((route, i) => <RouteListItem route={route} key={i} />);

    return (
      <ul className="routes-list inner">
        {items}
      </ul>
    );
  }
}

RouteListContainer.propTypes = {
  routes: PropTypes.arrayOf(RouteType.isRequired),
};

const routesSelector = (state) => state.getIn(['data', 'routes']);

const routesListSelector = createSelector(
  routesSelector,
  (routes) => routes.toList()
);

const sortedRoutesSelector = createSelector(
    routesListSelector,
    routes => {
      console.log('sort');
      return routes.sort(
      (a, b) => a.get('shortName').localeCompare(b.get('shortName'))
    );}
);

const mapStateToProps = createSelector(
  sortedRoutesSelector,
  (routes) => {
    console.log('routes', routes.toJS());
    return {
      routes: routes.toJS(),
    };
  }
);

export default connect(mapStateToProps)(RouteListContainer);
