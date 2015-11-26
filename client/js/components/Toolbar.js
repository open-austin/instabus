import React, {Component} from 'react';

export default class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar scroll area-fixed ">
          <div className="row row-center">
              <div className="col xs-12 sm-6 md-4 btn-group center">
                  <button className="btn  btn-small btn-ghost btn-active"> Nearby Arrivals </button>
                  <button className="btn  btn-small btn-ghost"> Routes</button>
                  <button className="btn  btn-small btn-ghost"> Popular </button>
              </div>
          </div>
      </div>
    );
  }
}
