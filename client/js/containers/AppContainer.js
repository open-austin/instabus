import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {setPage} from 'js/actions/ui';

import ErrorMessage from '../components/ErrorMessage';
import About from '../components/About';
import RouteList from '../components/RouteList';
import RouteDetail from '../components/RouteDetail';


export default class AppContainer extends Component {
  render() {
    let renderedElement;

    if (this.props.page === 'ABOUT') {
      renderedElement = <About />;
    }
    else if (this.props.page === 'ROUTE_LIST') {
      renderedElement = <RouteList />;
    }
    else if (this.props.page === 'ROUTE_DETAIL') {
      renderedElement = <RouteDetail />;
    }
    else {
      renderedElement = <div>404</div>;
    }

    return (
      <div>
        <ErrorMessage />
        {renderedElement}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.ui.page,
    errorMessage: state.ui.errorMessage,
  };
}

const mapDispatchToProps = {
  setPage,
};

AppContainer.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
