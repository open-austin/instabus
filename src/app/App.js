import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import TopBar from './TopBar';
import styles from 'styles/base.scss';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default cssmodules(App, styles);
