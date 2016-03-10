import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import styles from './ZoomControl.scss';


class ZoomControl extends Component {
  render() {
    return (
      <div styleName='wrap' />
    );
  }
}

export default cssmodules(ZoomControl, styles)
