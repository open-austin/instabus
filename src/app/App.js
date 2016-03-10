import React, { Component } from 'react';
import cssmodules from 'react-css-modules';

import styles from 'styles/base.scss';
import TopBar from './TopBar';
import RouteList from 'routes/RouteList';

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
        <RouteList />
      </div>
    );
  }
}

export default cssmodules(App, styles);
