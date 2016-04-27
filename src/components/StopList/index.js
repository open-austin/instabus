import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GlobalHistory, Router } from 'libs/routing';
import {
  ROUTE,
  DIRECTION,
} from 'constants';

import ContextMenu from 'components/ContextMenu';
import Spinner from 'components/Spinner';
import StopGroupSwitcher from './StopGroupSwitcher';
import { stopGroupSelector } from 'selectors/oba';

import { getStops } from 'actions/oba';

import styles from './styles.scss';

class RouteList extends Component {
  static propTypes = {
    route: PropTypes.object,
    stopGroups: PropTypes.object,
    stopsLoading: PropTypes.bool,
    modal: PropTypes.bool,
    getStops: PropTypes.func,
  }

  componentDidMount() {
    this._setUpRoute();
  }

  componentDidUpdate(prevProps) {
    const route = this.props.route;
    const routeId = route.options.routeId;
    const prevRoute = prevProps.route;
    const prevRouteId = prevRoute.options.routeId;
    if (prevRoute.name !== route.name || prevRouteId !== routeId) {
      this._setUpRoute();
    }
  }

  componentWillUnmount() {

  }

  _setDirection = () => {
    const id = this.props.route.options.routeId;
    const direction = this.props.stopGroups.directions[0];
    GlobalHistory.replace(Router.generate(DIRECTION, { routeId: id, routeDirection: direction }));
  }

  _setUpRoute = () => {
    if (!this.props.stopGroups) {
      this.props.getStops(this.props.route.options.routeId).then(() => {
        if (this.props.stopGroups.directions.length > 1 && !this.props.route.options.routeDirection) {
          this._setDirection();
        }
      });
    }
    else if (this.props.stopGroups.directions.length > 1 && !this.props.route.options.routeDirection) {
      this._setDirection();
    }
  }

  _renderStop = (stop) => <div className={styles.stopRow} key={stop.id}>{stop.name}</div>;

  _renderStops = () => {
    const { stopGroups, route } = this.props;
    let stopGroup;
    if (stopGroups.directions.length > 1 && route.name === DIRECTION) {
      stopGroup = stopGroups.groups[route.options.routeDirection].stops;
    }
    else if (stopGroups.directions.length === 1 && route.name === ROUTE) {
      stopGroup = stopGroups.groups[stopGroups.directions[0]].stops;
    }
    if (!stopGroup) return null;
    return stopGroup.map(this._renderStop);
  }

  _renderStopGroup = () => {
    const { stopsLoading, stopGroups, route } = this.props;

    if (stopsLoading || !stopGroups) {
      return (
        <div className={styles.loading}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className={styles.list}>
        { this._renderStops() }
      </div>
    );
  }

  _renderSwitcher = () => {
    const { stopsLoading, stopGroups, route } = this.props;

    if (stopsLoading || !stopGroups || !route.options.routeDirection) return null;

    return (
      <StopGroupSwitcher
        directions={stopGroups.directions}
        route={route}
      />
    );
  }

  _renderRouteInfo = () => {
    const { stopsLoading, stopGroups } = this.props;

    if (stopsLoading || !stopGroups) return null;

    return (
      <div className={styles.info}>
        <div className={styles.routeNumber}>{stopGroups.route.shortName}</div>
        <div className={styles.routeName}>{stopGroups.route.longName}</div>
      </div>
    );
  }

  render() {
    return (
      <ContextMenu minimized={!this.props.modal}>
        { this._renderSwitcher() }
        { this._renderRouteInfo() }
        { this._renderStopGroup() }
      </ContextMenu>
    );
  }
}

const mapDispatchToProps = {
  getStops,
};

const mapStateToProps = (state) => ({
  stopGroups: stopGroupSelector(state),
  route: state.ui.route,
  stopsLoading: state.ui.loading.stops,
  modal: state.ui.modal.stops,
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
