import React, {Component} from 'react';

export default class Title extends Component {
  render() {
    return (
      <div className="row row-center">
          <div className="col xs-12 sm-10 md-8 lg-6">
              <h3 className="indent-default">{this.props.children}</h3>
          </div>
      </div>
    );
  }
}
