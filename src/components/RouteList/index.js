import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ContextMenu from 'components/ContextMenu';
import RouteItem from './RouteItem';
import { sortedRoutesSelector } from 'selectors/oba';

import styles from './styles.scss';

class RouteList extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    routesLoading: PropTypes.bool,
    modal: PropTypes.bool,
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  _renderRoutes = () => {
    const { routesLoading, routes } = this.props;

    if (routesLoading) {
      return (
        <div className={styles.loading} />
      );
    }

    return routes.map(route => <RouteItem key={route.id} route={route} />);
  }

  render() {
    return (
      <ContextMenu minimized={!this.props.modal}>
        { this._renderRoutes() }
      </ContextMenu>
    );
  }
}

const mapStateToProps = (state) => ({
  routes: sortedRoutesSelector(state),
  routesLoading: state.ui.loading.routes,
  modal: state.ui.modal.routes,
});

export default connect(mapStateToProps)(RouteList);
