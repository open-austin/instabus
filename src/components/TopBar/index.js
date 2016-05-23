import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  ALL_ROUTES_PATH,
  ROUTE_PATH,
  DIRECTION_PATH,
  SAVED_PATH,
} from 'constants/Paths';

import styles from './styles.scss';

class TopBar extends Component {
  static propTypes = {
    route: PropTypes.object,
  }

  _renderTopBar = () => {
    const name = this.props.route.name;
    switch (name) {
      case ALL_ROUTES_PATH:
        break;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.bar} />
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.ui.route,
});

export default connect(mapStateToProps)(TopBar);
