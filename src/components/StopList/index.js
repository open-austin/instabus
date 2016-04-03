import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  RouteType,
} from 'constants/OBAPropTypes';
import { getStopsForRoute } from 'actions/oba/stops';
import {
  currentRouteSelector,
} from 'selectors/oba';

import StopGroupSwitch from 'components/StopList/StopGroupSwitch';

class StopList extends Component {
  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.shape({
      routeId: PropTypes.string.isRequired,
    }).isRequired,

    stopsForRouteLoading: PropTypes.bool.isRequired,
    route: RouteType,

    getStopsForRoute: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.routeId !== nextProps.params.routeId) {
      this.load();
    }
  }

  load() {
    console.log('loading stops for route', this.props.params.routeId);
    this.props.getStopsForRoute(this.props.params.routeId);
  }

  render() {
    const { stopsForRouteLoading } = this.props;

    if (stopsForRouteLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h1>Stop List</h1>
        <h2>{this.props.route && this.props.route.shortName}</h2>
        {stopsForRouteLoading && <div>Loading Stop List</div>}
        <StopGroupSwitch params={this.props.params} />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  route: currentRouteSelector,
  stopsForRouteLoading: (state) => state.ui.loading.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
