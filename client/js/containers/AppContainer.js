import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as uiActions from '../redux/ui';

import About from '../components/About';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Toolbar from '../components/Toolbar';
import Arrivals from '../components/Arrivals';

export default class AppContainer extends Component {
  render() {
    let renderedElement;
    if (this.props.page === 'About') {
      renderedElement = <About />;
    } else {
      renderedElement = <Arrivals />;
    }

    return (
      <div className="container-scroll-area">
        <Header />
        <Filters />
        <ErrorMessage errorMessage={this.props.errorMessage} />
        {renderedElement}
        <Toolbar />
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
