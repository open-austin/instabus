import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ContextMenu from 'components/ContextMenu';
import Spinner from 'components/Spinner';
import RouteItem from './RouteItem';
import { getRoutes } from 'actions/oba';

import styles from './styles.scss';

class RouteList extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object),
    routesLoading: PropTypes.bool,
    modal: PropTypes.bool,
    getRoutes: PropTypes.func,
  }

  componentDidMount() {
    if (!this.props.routes.length) this.props.getRoutes();
  }

  componentWillUnmount() {

  }

  _renderRoutes = () => {
    const { routesLoading, routes } = this.props;

    if (routesLoading) {
      return (
        <div className={styles.loading}>
          <Spinner />
        </div>
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

const mapDispatchToProps = {
  getRoutes,
};

const mapStateToProps = (state) => ({
  routes: state.data.routes.orderedRoutes,
  routesLoading: state.ui.loading.routes,
  modal: state.ui.modal.routes,
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
