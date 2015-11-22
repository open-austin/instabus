import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>App View Area</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tab: state.ui.tab,
  };
}

export default connect(mapStateToProps)(App);
