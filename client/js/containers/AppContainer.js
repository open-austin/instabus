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
import RouteDetails from '../components/RouteDetails';
import Popular from '../components/Popular';

export default class AppContainer extends Component {
  render() {
    let renderedElement;
    if (this.props.page === 'About') {
      renderedElement = <About />;
    } else if (this.props.page === 'Nearby') {
      renderedElement = <Nearby />;
    } else if (this.props.page === 'Routes') {
      if (this.props.route) {
        renderedElement = <RouteDetails />;
      } else {
        renderedElement = <RouteList />;
      }
    } else if (this.props.page === 'Popular') {
      renderedElement = <Popular />;
    } else {
      renderedElement = <div>404</div>;
    }

    return (
      <div className="container-scroll-area">
        <Header />
        <Filters />
        {renderedElement}
        <Toolbar
          currentPage={this.props.page}
          setPage={this.props.setPage}
          items={['Nearby', 'Routes', 'Popular', 'About']}
        />
        <ErrorMessage errorMessage={this.props.errorMessage} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.getIn(['ui', 'page']),
    route: state.getIn(['ui', 'route']),
    errorMessage: state.getIn(['ui', 'errorMessage']),
  };
}

const mapDispatchToProps = {
  setPage: uiActions.setPage,
};

AppContainer.propTypes = {
  page: PropTypes.string,
  route: PropTypes.string,
  setPage: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
