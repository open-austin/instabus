var React = require('react');

var MapLegend = React.createClass({
    propTypes: {
        fleetUpdateTime: React.PropTypes.string.isRequired,
    },

    render() {
        return (
            <div className='map-legend'>
                <div className='update-time'>Positions updated <b>{this.props.fleetUpdateTime}</b></div>
                <div className='legend'>
                    <div className='colors'>
                        <span className='status1'></span>
                        <span className='status2'></span>
                        <span className='status3'></span>
                        <span className='status4'></span>
                        <span className='status5'></span>
                    </div>
                    <div className='labels'>
                        <label>&lt;1m</label>
                        <label>2m</label>
                        <label>3m</label>
                        <label>4m</label>
                        <label>5m+</label>
                    </div>
                </div>
            </div>
        );
    },

});

module.exports = MapLegend;
