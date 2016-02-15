import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {RouteType} from 'js/constants/OBAPropTypes';
import {setCurrentRoute, setPage} from 'js/redux/ui';
import {loadRouteDetails} from 'js/redux/data';

class RouteListItem extends Component {
  constructor(props) {
    super(props);

    this.setCurrentRoute = () => {
      this.props.setCurrentRoute(this.props.route.id);
      this.props.setPage('ROUTE_DETAIL');
      this.props.loadRouteDetails(this.props.route.id);
    };
  }

  render() {
    return (
      <li>
        <div className="row" onClick={this.setCurrentRoute}>
          <span className="id" data-bind="text: id, click: toggleDirections">{this.props.route.shortName}</span>
          <span className="name" data-bind="text: name, click: toggleDirections">{this.props.route.longName}</span>
          <button className="star">Star</button>
          <button className="chevron">Chevron</button>
        </div>
      </li>
    );
  }
}

RouteListItem.propTypes = {
  route: RouteType.isRequired,
  setCurrentRoute: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,

  loadRouteDetails: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setCurrentRoute,
  setPage,
  loadRouteDetails,
};

export default connect(null, mapDispatchToProps)(RouteListItem);