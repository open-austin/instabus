import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import toJS from 'immutable-to-js';

import {RouteShape} from '../../constants/PropTypes';
import RouteMap from './RouteMap';
import Title from '../Title';

export default class RouteDetails extends Component {
  render() {
    if (!this.props.route) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Title>{this.props.route.shortName} {this.props.route.longName}</Title>
        <RouteMap
          route={this.props.route}
          center={this.props.userLatLng}
        />
      </div>
    );
  }
}

RouteDetails.propTypes = {
  route: PropTypes.shape(RouteShape),
  userLatLng: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const routeId = state.getIn(['ui', 'route']);
  const route = state.getIn(['data', 'routes', routeId]);

  return {
    route: toJS(route),
    userLatLng: state.getIn(['ui', 'userLatLng']).toJS(),
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetails);
