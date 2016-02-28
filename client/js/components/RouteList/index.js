import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import _ from 'lodash';

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

const routesSelector = (state) => state.data.routes;

const routesListSelector = createSelector(
  routesSelector,
  (routes) => _.values(routes),
);

const sortedRoutesSelector = createSelector(
    routesListSelector,
    routes => routes.sort((a, b) => a.shortName.localeCompare(b.shortName))
);

const mapStateToProps = createSelector(
  sortedRoutesSelector,
  (routes) => {
    return {
      routes,
    };
  }
);

export default connect(mapStateToProps)(RouteListContainer);
