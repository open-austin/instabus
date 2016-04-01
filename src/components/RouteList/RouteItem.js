import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RouteType } from 'constants/OBAPropTypes';
import { setCurrentRoute } from 'actions/ui';

import styles from './styles.scss'

class RouteItem extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    setCurrentRoute: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.setCurrentRoute = () => {
      this.props.setCurrentRoute(this.props.route.id);
    };
  }

  render() {
    const { route } = this.props;
    return (
      <div key={route.id} className={styles.item} onClick={this.setCurrentRoute}>
        <div className={styles.id}>{route.shortName}</div>
        <div className={styles.info}>
          <div className={styles.name}>{route.longName}</div>
          <div className={styles.trips}>8 buses running</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrentRoute,
};

export default connect(null, mapDispatchToProps)(RouteItem);
