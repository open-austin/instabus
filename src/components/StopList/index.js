import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { STOP_LIST_TAB } from 'constants/TabNames';
import { getStopsForRoute } from 'actions/oba/stops';

import Spinner from 'components/Spinner';
import StopGroup from 'components/StopList/StopGroup';
import StopGroupSwitch from 'components/StopList/StopGroupSwitch';

class StopList extends Component {
  static propTypes = {
    children: PropTypes.node,
    routeId: PropTypes.string.isRequired,

    stopsForRouteLoading: PropTypes.bool.isRequired,

    getStopsForRoute: PropTypes.func.isRequired,
  };

  static TAB_NAME = STOP_LIST_TAB.name;

  componentWillMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeId !== nextProps.routeId) {
      this.load();
    }
  }

  load() {
    this.props.getStopsForRoute(this.props.routeId);
  }

  render() {
    const { stopsForRouteLoading } = this.props;

    return (
      <div>
        <h1>Stop List</h1>
        {stopsForRouteLoading && <Spinner />}
        <StopGroupSwitch />
        <StopGroup />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  routeId: (state) => state.routing.routeId,
  stopGroupId: (state) => state.routing.stopGroupId,
  stopsForRouteLoading: (state) => state.ui.loading.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
