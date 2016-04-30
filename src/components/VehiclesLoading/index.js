import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

class VehiclesLoading extends Component {
  static propTypes = {
    initialVehiclesLoaded: PropTypes.bool,
  }

  render() {
    if (!this.props.initialVehiclesLoaded) {
      return (
        <div className={styles.wrap}>
          <div className={styles.spinner} />
          <div className={styles.text}>Locating Buses</div>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  initialVehiclesLoaded: state.ui.initialVehiclesLoaded,
});

export default connect(mapStateToProps)(VehiclesLoading);
