import React, { Component } from 'react';

import RoutesButton from './RoutesButton';
import SavedButton from './SavedButton';

import styles from './styles.scss';

export default class NavBar extends Component {
  render() {
    return (
      <div className={styles.nav}>
        <RoutesButton />
        <SavedButton />
      </div>
    );
  }
}
