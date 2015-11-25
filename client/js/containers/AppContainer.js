import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as uiActions from '../redux/ui';

import About from '../components/About';
import App from '../components/App';
import ErrorMessage from '../components/ErrorMessage';

export default class AppContainer extends Component {
  render() {
    let renderedElement;
    if (this.props.page === 'About') {
      renderedElement = <About />;
    } else {
      renderedElement = <App />;
    }

    return (
      <div>
        {this.props.errorMessage}
        <button type="button" onClick={() => this.props.setPage('App')}>Instabus</button>
        <button type="button" onClick={() => this.props.setPage('About')}>About</button>
        <ErrorMessage />
        {renderedElement}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['ui', 'page']),
    errorMessage: state.getIn(['ui', 'errorMessage']),
  };
}

const mapDispatchToProps = {
  setPage: uiActions.setPage,
};

AppContainer.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
