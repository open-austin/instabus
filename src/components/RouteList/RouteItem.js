import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { GlobalHistory } from 'libs/routing';
import { RouteType } from 'constants/OBAPropTypes';

import classNames from 'classnames';
import { mobile } from 'libs/mobile';

import SaveButton from './SaveButton';
import StopsButton from './StopsButton';

import styles from './styles.scss';

class RouteItem extends Component {
  static propTypes = {
    route: RouteType.isRequired,
    vehicleCount: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.showStops = () => {
      const routeId = this.props.route.id;
      GlobalHistory.push(`/route/${routeId}/stop`);
    };
  }

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
    const { route, vehicleCount } = this.props;
    const itemStyle = classNames(styles.item, {
      [`${styles.hover}`]: !mobile,
      [`${styles.pressed}`]: (mobile && this.state.pressed),
    });
    return (
      <div key={route.id} className={styles.itemWrap}>
        <div
          className={itemStyle}
          onClick={this.showStops}
          onTouchStart={this.onPress}
          onTouchEnd={this.offPress}
        >
          <div className={styles.id}>{route.shortName}</div>
          <div className={styles.info}>
            <div className={styles.name}>{route.longName}</div>
            <div className={styles.trips}>{vehicleCount} buses running</div>
          </div>
          <div className={styles.caret}>
            <div className={styles.caretTop} />
            <div className={styles.caretBottom} />
          </div>
        </div>
        <div className={styles.btns}>
          <SaveButton saved={false} />
          <StopsButton />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({
  vehicleCount: 8,
});

export default connect(mapStateToProps)(RouteItem);
