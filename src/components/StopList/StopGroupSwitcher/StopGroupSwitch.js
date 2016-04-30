import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import classNames from 'classnames';

import styles from './styles.scss';

export default class StopGroupSwitch extends Component {
  static propTypes = {
    direction: PropTypes.string,
    checked: PropTypes.bool,
  };

  render() {
    const { direction, checked } = this.props;
    const stopDirection = _.startCase(direction);
    const labelStyle = classNames(styles.label, {
      [`${styles.checked}`]: checked,
    });
    return (
      <div className={labelStyle}>
        <div className={styles.labelText}>
          {stopDirection}
        </div>
      </div>
    );
  }
}
