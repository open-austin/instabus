import React, {Component} from 'react';

import {TripDetailShape} from '../../constants/PropTypes';
import TimeAgo from '../TimeAgo';

export default class ArrivalCard extends Component {
  render() {
    return (
      <div>
        <div className="col col-fill">
          <h4>{this.props.tripHeadsign}</h4>
          <h6>{this.props.stopName} {this.props.formattedStopDistance} away</h6>
          <div>{this.props.arrivalMoment.format('h:mm:ss a z')}</div>
        </div>
        <div className="col">
          <h2 className=""><span className="text-tall">
            <TimeAgo moment={this.props.arrivalMoment} />
          </span></h2>
        </div>
      </div>
    );
  }
}

ArrivalCard.propTypes = TripDetailShape;
