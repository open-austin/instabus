import React, {Component} from 'react';

export default class Arrivals extends Component {
  render() {
    return (
      <div className="card row row-nowrap" key={this.props.id}>
        <div className="col col-fill">
          <h3>803 Burnet / Lamar</h3>
          <h4>Republic Park Square Station</h4>
          <h6>422 Guadalupe St, Austin, TX 78701</h6>
        </div>
        <div className="col">
          <h2 className=""><span className="text-tall">33</span>m</h2>
        </div>
      </div>
    );
  }
}
