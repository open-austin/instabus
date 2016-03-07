import React from 'react';
import CSSModules from 'react-css-modules';
import { observer } from 'mobx-react';

@observer
class RouteDetails extends React.Component {
  componentDidMount() {
    this.props.data.loadTripsForRoute(this.props.route);
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
