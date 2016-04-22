import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
    if (!this.props.stops) this.props.getStops(this.props.route.options.routeId);
  }

  componentWillUnmount() {

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
