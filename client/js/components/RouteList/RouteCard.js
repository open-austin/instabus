import React, {Component, PropTypes} from 'react';

export default class RouteCard extends Component {
  render() {
    return (
      <div className="card row row-nowrap" onClick={this.props.onClick}>
        <div className="col col-fill">
          <span>
            <span className="text-tall">{this.props.shortName} </span>
            {this.props.longName}
          </span>
        </div>
      </div>
    );
  }
}

RouteCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  shortName: PropTypes.string,
  longName: PropTypes.string,
};
