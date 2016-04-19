import React, { Component } from 'react';

import RoutesButton from './RoutesButton';
import FavoritesButton from './FavoritesButton';

import styles from './styles.scss';

export default class NavBar extends Component {
  render() {
    return (
      <div className={styles.nav}>
        <RoutesButton />
        <FavoritesButton />
      </div>
    );
  }
}
