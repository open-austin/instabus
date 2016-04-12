import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  incrementMapZoom,
  decrementMapZoom,
} from 'actions/map';

import styles from './styles.scss';

class ZoomControl extends Component {
  static propTypes = {
    incrementMapZoom: PropTypes.func,
    decrementMapZoom: PropTypes.func,
  }

  render() {
    return (
      <div className={styles.zoom}>
        <div className={styles.zoomIn} onClick={this.props.incrementMapZoom}>
          <div className={styles.zoomPlus} />
          <div className={styles.zoomMinus} />
        </div>
        <div className={styles.zoomOut} onClick={this.props.decrementMapZoom}>
          <div className={styles.zoomMinus} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  incrementMapZoom,
  decrementMapZoom,
};

export default connect(null, mapDispatchToProps)(ZoomControl);
