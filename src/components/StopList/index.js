import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import classNames from 'classnames';

import { STOP_LIST_TAB } from 'constants/TabNames';
import { getStopsForRoute } from 'actions/oba/stops';

import ContextMenu from 'components/ContextMenu';
import Spinner from 'components/Spinner';
import StopGroup from 'components/StopList/StopGroup';
import StopGroupSwitch from 'components/StopList/StopGroupSwitch';

import styles from './styles.scss';

class StopList extends Component {
  static propTypes = {
    children: PropTypes.node,
    routeId: PropTypes.string.isRequired,

    stopsForRouteLoading: PropTypes.bool.isRequired,

    getStopsForRoute: PropTypes.func.isRequired,

    showStops: PropTypes.bool.isRequired,
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

  renderStopList = () => {
    if (this.props.stopsForRouteLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <StopGroupSwitch />
        <StopGroup />
      </div>
    );
  }

  render() {
    const listStyle = classNames(styles.list, {
      [`${styles.show}`]: this.props.showStops,
    });
    return (
      <div>
        <ContextMenu>
          <div className={listStyle}>
            { this.renderStopList() }
          </div>
        </ContextMenu>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  showStops: (state) => false,
  routeId: (state) => state.routing.routeId,
  stopGroupId: (state) => state.routing.stopGroupId,
  stopsForRouteLoading: (state) => state.ui.loading.stopsForRouteLoading,
});

const mapDispatchToProps = {
  getStopsForRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
