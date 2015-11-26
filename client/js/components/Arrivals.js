import React, {Component} from 'react';

import Title from './Title';
import ArrivalsCard from './ArrivalsCard';

export default class Arrivals extends Component {
  render() {
    const cards = [1, 2, 3].map((id) => <ArrivalsCard id={id} />);

    return (
      <div className="container-responsive container-flush-both-xs">
        <Title text="Nearby Arrivals"/>
        <div className="row row-center">
          <div className="col xs-12 sm-10 md-8 lg-6 card-group">
            {cards}
          </div>
        </div>
      </div>
    );
  }
}
