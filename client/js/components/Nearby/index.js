import React, {Component} from 'react';

import Title from '../Title';
import Card from './Card';

export default class Nearby extends Component {
  render() {
    const cards = [1, 2, 3].map((id) => <Card id={id} key={id} />);

    return (
      <div className="container-responsive container-flush-both-xs">
        <Title>Nearby</Title>
        <div className="row row-center">
          <div className="col xs-12 sm-10 md-8 lg-6 card-group">
            {cards}
          </div>
        </div>
      </div>
    );
  }
}
