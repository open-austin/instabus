import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import TopBar from './TopBar';
import styles from 'styles/base.scss';

class App extends Component {
  render() {
    return (
      <div>
        heello
        <TopBar />
      </div>
    );
  }
}

export default cssmodules(styles, Root);
