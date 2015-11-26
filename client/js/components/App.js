import React, {Component} from 'react';
import {connect} from 'react-redux';

import TripsForLocation from './TripsForLocation';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>App View Area</div>
        <TripsForLocation />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tab: state.getIn(['ui', 'tab']),
  };
}

export default connect(mapStateToProps)(App);
