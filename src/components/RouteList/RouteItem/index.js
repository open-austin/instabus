import React, { Component, PropTypes } from 'react';

import { GlobalHistory, Router } from 'libs/routing';

import SaveButton from './SaveButton';
import StopsButton from './StopsButton';

import {
  ROUTE_PATH,
} from 'constants/Paths';

import styles from './styles.scss';

export default class RouteItem extends Component {
  static propTypes = {
    route: PropTypes.object,
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  _selectRoute = (e) => {
    e.preventDefault();
    GlobalHistory.push(Router.generate(ROUTE_PATH, { routeId: this.props.route.id }));
    return false;
  }

  render() {
    const { route } = this.props;
    return (
      <div
        href={`route/${route.id}`}
        className={styles.wrap}
      >
        <a
          className={styles.route}
          onClick={this._selectRoute}
        >
          <div className={styles.id}>{route.shortName}</div>
          <div className={styles.info}>
            <div className={styles.name}>{route.longName}</div>
            <div className={styles.trips}>0 buses running</div>
          </div>
          <div className={styles.caret}>
            <div className={styles.caretTop} />
            <div className={styles.caretBottom} />
          </div>
        </a>
        <div className={styles.btns}>
          <SaveButton />
          <StopsButton />
        </div>
      </div>
    );
  }
}
