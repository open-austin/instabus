import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import InitialState from 'constants/InitialState';

import styles from './styles.scss';

class VehiclesLoading extends Component {
  static propTypes = {
    vehicles: PropTypes.object,
  }

  state = {
    loading: true,
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading && nextProps.vehicles !== InitialState.data.vehicles) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading) {
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
  vehicles: state.data.vehicles,
});

export default connect(mapStateToProps)(VehiclesLoading);
