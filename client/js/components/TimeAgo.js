import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';

function seconds(aMoment) {
  return (aMoment.diff(moment(), 'seconds') % 60) + 's';
}
function minutes(aMoment) {
  var diff = aMoment.diff(moment(), 'minutes');
  if (diff < 60) {
    return diff + 'm';
  } else {
    diff = aMoment.diff(moment(), 'hours');
    return diff + 'h';
  }
}
function past(aMoment) {
  return !aMoment.isAfter();
}

export default class Trip extends Component {
  constructor(props) {
    super(props);
    this.intervalID = setInterval(() => this.forceUpdate(), this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const prettyMinutes = minutes(this.props.moment);
    const prettySeconds = seconds(this.props.moment);
    const classes = classNames({
      past: past(this.props.moment),
    });

    return (
      <div className={classes}>
        <span>{prettyMinutes}</span>
        <span> {prettySeconds}</span>
      </div>
    );
  }
}

Trip.propTypes = {
  moment: PropTypes.object.isRequired,
  interval: PropTypes.number.isRequired,
};
