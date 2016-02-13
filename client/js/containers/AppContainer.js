import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as uiActions from '../redux/ui';

import About from '../components/About';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import Filters from '../components/Filters';
import Toolbar from '../components/Toolbar';
import Nearby from '../components/Nearby';
import RouteList from '../components/RouteList';
import RouteDetail from '../components/RouteDetail';
import Popular from '../components/Popular';


export default class AppContainer extends Component {
  render() {
    let renderedElement;

    if (this.props.page === 'ABOUT') {
      renderedElement = <About />;
    } else if (this.props.page === 'NEARBY') {
      renderedElement = <Nearby />;
    } else if (this.props.page === 'ROUTE_LIST') {
      renderedElement = <RouteList />;
    } else if (this.props.page === 'ROUTE_DETAIL') {
      renderedElement = <RouteDetail />;
    } else if (this.props.page === 'POPULAR') {
      renderedElement = <Popular />;
    } else {
      renderedElement = <div>404</div>;
    }

    return (
      <div>
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
