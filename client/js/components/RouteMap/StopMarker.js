var React = require("react");
var Leaflet = require("leaflet");
var latlngType = require("react-leaflet").PropTypes.latlng;
var popupContainerMixin = require("react-leaflet").mixins.popupContainer;
require('leaflet.label');

module.exports = React.createClass({
  displayName: "StopMarker",

  mixins: [popupContainerMixin],

  propTypes: {
    center: latlngType.isRequired,
    radius: React.PropTypes.number,
    label: React.PropTypes.string,
  },

  componentWillMount() {
    var {center, map, ...props} = this.props;
    this._leafletElement = Leaflet.circleMarker(center, props);

    if (this.props.label) {
        this._leafletElement.bindLabel(this.props.label, {
            noHide: false,
            direction: 'auto',
            className: 'stop-leaflet-label',
            offset: [15, -10],
            clickable: true,
       });
    }
  },

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.getLeafletElement().setLatLng(this.props.center);
    }
    if (this.props.radius !== prevProps.radius) {
      this.getLeafletElement().setRadius(this.props.radius);
    }
  }
});
