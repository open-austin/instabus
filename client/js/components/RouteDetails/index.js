import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import toJS from 'immutable-to-js';

import {RouteShape} from '../../constants/PropTypes';
import {setRoute} from '../../redux/ui';
import RouteMap from './RouteMap';
import Title from '../Title';

export default class RouteDetails extends Component {
  render() {
    return (
      <div>
        <Title>{this.props.route.shortName} {this.props.route.longName}</Title>
        <RouteMap {...this.props.route} />
      </div>
    );
  }
}

RouteDetails.propTypes = {
  route: PropTypes.shape(RouteShape),
  setRoute: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const routeId = state.getIn(['ui', 'route']);
  const route = state.getIn(['data', 'routes', routeId]);

  return {
    route: toJS(route),
  };
}

const mapDispatchToProps = {
  setRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetails);
