import React, {Component} from 'react';

import Title from '../Title';
import NearbyArrivalsContainer from './NearbyArrivalsContainer';

export default class Nearby extends Component {
  render() {
    return (
      <div className="container-responsive container-flush-both-xs">
        <Title>Nearby</Title>
        <div className="row row-center">
            <NearbyArrivalsContainer />
        </div>
      </div>
    );
  }
}
