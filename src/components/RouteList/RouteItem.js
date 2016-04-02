import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import { RouteType } from 'constants/OBAPropTypes';

import styles from './styles.scss';


export default class RouteItem extends Component {
  static propTypes = {
    route: RouteType.isRequired,
  };

  constructor(props) {
    super(props);

    this.showRoute = () => {
      const routeId = this.props.route.id;
      browserHistory.push(`/route/${routeId}`);
    };
  }

  render() {
    const { route } = this.props;
    return (
      <div key={route.id} className={styles.item} onClick={this.showRoute}>
        <div className={styles.id}>{route.shortName}</div>
        <div className={styles.info}>
          <div className={styles.name}>{route.longName}</div>
          <div className={styles.trips}>8 buses running</div>
        </div>
      </div>
    );
  }
}

// export default connect()(RouteItem);
