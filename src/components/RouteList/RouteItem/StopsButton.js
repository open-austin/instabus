import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { mobile } from 'libs/mobile';

import styles from './StopsButton.scss';

export default class StopsButton extends Component {
  static propTypes = {};

  state = {
    pressed: false,
  }

  onPress = () => {
    this.setState({
      pressed: true,
    });
  }

  onClick = (e) => {
    e.stopPropagation();
  }

  offPress = () => {
    this.setState({
      pressed: false,
    });
  }

  render() {
    const btnStyle = classNames(styles.stops, {
      [`${styles.hover}`]: !mobile,
      [`${styles.pressed}`]: (mobile && this.state.pressed),
    });
    return (
      <div
        className={btnStyle}
        onClick={this.onClick}
        onTouchStart={this.onPress}
        onTouchEnd={this.offPress}
      >
        <div className={styles.icon} />
        <div className={styles.label}>View Stops</div>
      </div>
    );
  }
}
