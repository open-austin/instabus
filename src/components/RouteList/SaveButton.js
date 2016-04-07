import React, { Component, PropTypes } from 'react';

import styles from './styles.scss';

export default class SaveButton extends Component {
  static propTypes = {
    saved: PropTypes.bool.isRequired,
  };

  render() {
    const { saved } = this.props;
    let btnStyle;
    let btnText;
    if (saved) {
      btnStyle = styles.saved;
      btnText = 'Saved';
    }
    else {
      btnStyle = styles.save;
      btnText = 'Save';
    }
    return (
      <div className={btnStyle}>
        <div className={styles.icon} />
        <div className={styles.label}>{btnText}</div>
      </div>
    );
  }
}
