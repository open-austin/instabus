import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createSelector } from 'reselect';

import { mobile } from 'libs/mobile';
import { saveRoute, unsaveRoute } from 'actions/saved';

import styles from './SaveButton.scss';

const SAVE = 'Save';
const SAVED = 'Saved';

const Icon = ({ style }) => (
  <svg className={style} wrouteIdth="22" height="19" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.847 1c-1.395 0-2.513.5-3.5 1.487l-.562.708-.56-.663C9.235 1.542 8.117 1 6.722 1s-2.707.543-3.693 1.53c-.99.986-1.53 2.298-1.53 3.693 0 1.394.542 2.705 1.527 3.69l6.933 6.992c.22.22.515.344.825.344.31 0 .606-.127.824-.347l6.93-6.99c.985-.986 1.53-2.298 1.53-3.692 0-1.394-.545-2.706-1.53-3.692C17.553 1.542 16.242 1 14.846 1z" />
  </svg>
);

Icon.propTypes = {
  style: PropTypes.string,
};

class SaveButton extends Component {
  static propTypes = {
    saved: PropTypes.bool,
    routeId: PropTypes.string.isRequired,
    unsaveRoute: PropTypes.func.isRequired,
    saveRoute: PropTypes.func.isRequired,
  };

  state = {
    pressed: false,
  }

  onClick = (e) => {
    e.stopPropagation();
    if (this.props.saved) {
      this.props.unsaveRoute(this.props.routeId);
    }
    else {
      this.props.saveRoute(this.props.routeId);
    }
  }

  onPress = () => {
    this.setState({
      pressed: true,
    });
  }

  offPress = () => {
    this.setState({
      pressed: false,
    });
  }

  render() {
    const { saved } = this.props;
    const btnText = (saved) ? SAVED : SAVE;
    const saveStyle = (saved) ? styles.saved : styles.save;
    const btnStyle = classNames(saveStyle, {
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
        <Icon style={styles.icon} />
        <div className={styles.label}>{btnText}<span className={styles.extra}> Route</span></div>
      </div>
    );
  }
}

const makeIsRouteSavedSelector = () => createSelector(
  (state) => state.data.saved.savedRoutes,
  (state, props) => props.routeId,
  (savedRoutes, routeId) => !!savedRoutes.find((id) => id === routeId)
);

function mapStateToProps() {
  const isRouteSavedSelector = makeIsRouteSavedSelector();
  return (state, props) => ({
    saved: isRouteSavedSelector(state, props),
  });
}

const mapDispatchToProps = {
  unsaveRoute,
  saveRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
