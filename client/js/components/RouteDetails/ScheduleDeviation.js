import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class Trip extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const deviation = this.props.scheduleDeviation;
    // 0 also means we just don't know
    if (deviation === 0) {
      return <div />;
    }

    const formattedDeviation = Math.abs(deviation) < 60 ? deviation + 's' : Math.floor(deviation / 60) + 'm';

    if (deviation > 0) {
      return <div className="schedule-deviation ahead">{formattedDeviation} ahead of schedule</div>;
    }

    return <div className="schedule-deviation behind">{formattedDeviation} behind schedule</div>;
  }
}

Trip.propTypes = {
  scheduleDeviation: PropTypes.number.isRequired,
};
