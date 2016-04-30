import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ContextMenu from 'components/ContextMenu';
import Spinner from 'components/Spinner';
import RouteItem from 'components/RouteList/RouteItem';

import { savedRoutesSelector } from 'selectors/oba';
import { getRoutes } from 'actions/oba';

import styles from './styles.scss';

class Saved extends Component {
  static propTypes = {
    getRoutes: PropTypes.func.isRequired,
    savedRoutes: PropTypes.arrayOf(PropTypes.object),
    routesLoading: PropTypes.bool,
    modal: PropTypes.bool,
  }

  componentDidMount() {
    if (!this.props.savedRoutes.length) {
      this.props.getRoutes();
    }
  }

  renderSpinner() {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  render() {
    return (
      <ContextMenu minimized={!this.props.modal}>
        { this.props.routesLoading && this.renderSpinner() }
        { this.props.savedRoutes.map((route) => (
          <RouteItem key={route.id} route={route} />
        )) }
      </ContextMenu>
    );
  }
}

const mapStateToProps = (state) => ({
  savedRoutes: savedRoutesSelector(state),
  routesLoading: state.ui.loading.routes,
  modal: state.ui.modal.saved,
});

const mapDispatchToProps = {
  getRoutes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
