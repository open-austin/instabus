import React, { Component, PropTypes } from 'react';

import styles from './styles.scss';

export default class StopsButton extends Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.stops}>
        <div className={styles.icon} />
        <div className={styles.label}>View Stops</div>
      </div>
    );
  }
}
