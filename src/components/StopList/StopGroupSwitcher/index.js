import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import { GlobalHistory, Router } from 'libs/routing';
import {
  DIRECTION,
} from 'constants';

import styles from './styles.scss';

import StopGroupSwitch from './StopGroupSwitch';

export default class StopGroupSwitcher extends Component {
  static propTypes = {
    directions: PropTypes.arrayOf(PropTypes.string),
    route: PropTypes.object,
  };

  _switchGroups = () => {
    const { route, directions } = this.props;
    const { routeId, routeDirection } = route.options;
    const direction = _.find(directions, d => d !== routeDirection);
    GlobalHistory.push(Router.generate(DIRECTION, { routeId, routeDirection: direction }));
  }

  render() {
    const { directions, route } = this.props;

    if (directions.length <= 1) {
      return null;
    }

    const directionToggles = directions.map((direction, i) => (
      <StopGroupSwitch
        key={i}
        direction={direction}
        checked={direction === route.options.routeDirection}
      />
    ));

    const sliderTranslate = {
      transform: `translateX(${(route.options.routeDirection === directions[0]) ? '0' : '100%'})`,
    };

    return (
      <div className={styles.sliderWrap} onClick={this._switchGroups}>
        <div className={styles.toggles}>
          {directionToggles}
        </div>
        <div className={styles.slider} style={sliderTranslate} />
      </div>
    );
  }
}
