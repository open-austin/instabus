import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './BusCheckInKey.scss';


class BusCheckInKey extends Component {
  render() {
    return (
      <div styleName="wrap" />
    );
  }
}

export default CSSModules(BusCheckInKey, styles);
