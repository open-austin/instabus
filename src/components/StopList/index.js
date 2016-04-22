import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GlobalHistory, Router } from 'libs/routing';
import {
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
    stops: PropTypes.arrayOf(PropTypes.object),
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
    const direction = this.props.stops[0].direction.toLowerCase();
    GlobalHistory.replace(Router.generate(DIRECTION, { routeId: id, routeDirection: direction }));
  }

  _setUpRoute = () => {
    if (!this.props.stops) {
      this.props.getStops(this.props.route.options.routeId).then(() => {
        if (this.props.stops.length > 1) {
          this._setDirection();
        }
      });
    }
    else if (this.props.stops.length > 1 && !this.props.route.options.direction) {
      this._setDirection();
    }
  }

  _renderStops = () => {
    const { stopsLoading, stops } = this.props;

    if (stopsLoading) {
      return (
        <div className={styles.loading}>
          <Spinner />
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <ContextMenu minimized={!this.props.modal}>
        { this._renderStops() }
      </ContextMenu>
    );
  }
}

const mapDispatchToProps = {
  getStops,
};

const mapStateToProps = (state) => ({
  stops: stopGroupSelector(state),
  route: state.ui.route,
  stopsLoading: state.ui.loading.stops,
  modal: state.ui.modal.stops,
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
