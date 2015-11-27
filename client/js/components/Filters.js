import React, {Component} from 'react';

export default class Filters extends Component {
  render() {
    return (
      <div className="header container-responsive scroll-area-fixed">
        <div className="row row-padding row-center scroll-area-fixed">
          <div className="col xs-12 sm-6 md-4 btn-group center">
            <button className="btn  btn-small btn-ghost btn-active"> All </button>
            <button className="btn  btn-small btn-ghost"> Favorites </button>
            <button className="btn  btn-small btn-ghost"> Popular </button>
          </div>
        </div>
      </div>
    );
  }
}
