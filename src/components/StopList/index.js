import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GlobalHistory, Router } from 'libs/routing';
import {
  ROUTE,
  DIRECTION,
} from 'constants';

import ContextMenu from 'components/ContextMenu';
import Spinner from 'components/Spinner';
import { stopGroupSelector } from 'selectors/oba';

import { getStops } from 'actions/oba';

import styles from './styles.scss';

class RouteList extends Component {
  static propTypes = {
    route: PropTypes.object,
    stopGroups: PropTypes.arrayOf(PropTypes.object),
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
    const direction = this.props.stopGroups[0].direction;
    GlobalHistory.replace(Router.generate(DIRECTION, { routeId: id, routeDirection: direction }));
  }

  _setUpRoute = () => {
    if (!this.props.stopGroups) {
      this.props.getStops(this.props.route.options.routeId).then(() => {
        if (this.props.stopGroups.length > 1) {
          this._setDirection();
        }
      });
    }
    else if (this.props.stopGroups.length > 1 && !this.props.route.options.direction) {
      this._setDirection();
    }
  }

  _renderStop = (stop) => <div key={stop.id}>{stop.name}</div>;

  _renderStops = () => {
    const { stopGroups, route } = this.props;
    if (!stopGroups) return null;
    let stopGroup;
    if (stopGroups.length > 1 && route.name === DIRECTION) {
      stopGroup = stopGroups.filter(group => group.direction === route.options.routeDirection)[0].stops;
    }
    else if (stopGroups.length === 1 && route.name === ROUTE) {
      stopGroup = stopGroups[0].stops;
    }
    if (!stopGroup) return null;
    return stopGroup.map(this._renderStop);
  }

  _renderStopGroups = () => {
    const { stopsLoading } = this.props;

    if (stopsLoading) {
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

  render() {
    return (
      <ContextMenu minimized={!this.props.modal}>
        { this._renderStopGroups() }
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
