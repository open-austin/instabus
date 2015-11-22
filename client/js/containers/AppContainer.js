import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as uiActions from '../redux/ui';

import About from '../components/About';
import App from '../components/App';

export default class AppContainer extends Component {
  togglePage() {
    if (this.props.page === 'App') {
      this.props.setPage('About');
    } else {
      this.props.setPage('App');
    }
  }
  render() {
    let renderedElement;
    if (this.props.page === 'About') {
      renderedElement = <About />;
    } else {
      renderedElement = <App />;
    }

    return (
      <div>
        <button type="button" onClick={this.togglePage.bind(this)}>About</button>
        {renderedElement}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.ui.page,
  };
}

const mapDispatchToProps = {
  setPage: uiActions.setPage,
};

AppContainer.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
