import Icons from 'js/constants/Icons';

var React = require("react");
var Leaflet = require("leaflet");
var latlngType = require("react-leaflet").PropTypes.latlng;
var popupContainerMixin = require("react-leaflet").mixins.popupContainer;


function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}

function animateMarker(marker, i, steps, startLatLng, deltaLatLng) {
  var x = easeInOutCubic(i, startLatLng[0], deltaLatLng[0], steps),
  y = easeInOutCubic(i, startLatLng[1], deltaLatLng[1], steps);

  marker.setLatLng([x, y]);

  if (i < steps) {
    Leaflet.Util.requestAnimFrame(animateMarker.bind(null, marker, i + 1, steps, startLatLng, deltaLatLng), null, false, marker._container);
  }
}

function formatVehicleIconHTML(heading, routeId, directionSymbol, updateStatus) {
  // FIXME: These are not being updated
  var formattedVehicleHtml = Icons.VEHICLE;

  formattedVehicleHtml = formattedVehicleHtml.replace('{svg-transform}', 'rotate(' + heading + ' 26 26)');
  formattedVehicleHtml = formattedVehicleHtml.replace('{route-id}', routeId);
  formattedVehicleHtml = formattedVehicleHtml.replace('{direction-symbol}', directionSymbol);

  formattedVehicleHtml = formattedVehicleHtml.replace(/{vehicle-status-color}/g, updateStatus);

  var offsetIndex = String(routeId).length - 1;
  var xOffsets = [23, 20, 17, 14];
  formattedVehicleHtml = formattedVehicleHtml.replace('{route-id-x-offset}', xOffsets[offsetIndex]);
  var yOffsets = [24, 25, 26, 27.5];
  formattedVehicleHtml = formattedVehicleHtml.replace('{route-id-y-offset}', yOffsets[offsetIndex]);
  var yDirectionOffsets = [35, 36, 37, 39];
  formattedVehicleHtml = formattedVehicleHtml.replace('{direction-symbol-y-offset}', yDirectionOffsets[offsetIndex]);

  return formattedVehicleHtml;
}


// Based on https://github.com/PaulLeCam/react-leaflet/blob/ba19dfc3db363b3b38a1d4131186d9168efc9504/src/Marker.js
export default class VehicleMarker extends Marker {
  componentWillMount() {
    var {map, position, ...props} = this.props;

    props.icon = Leaflet.divIcon({
      className: 'vehicle-icon',
      html: formatVehicleIconHTML(this.props.heading, this.props.routeId, this.props.directionSymbol, this.props.updateStatus),
    });

    this.leafletElement = Leaflet.marker(position, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.heading !== prevProps.heading) {
      var path = this._leafletElement._icon.querySelector('#circle-shape');
      path.setAttribute('transform',  'rotate(' + this.props.heading + ' 26 26)');
    }
    if (this.props.updateStatus !== prevProps.updateStatus) {
      var circleShape = this._leafletElement._icon.querySelector('#circle-shape');
      circleShape.setAttribute('class', this.props.updateStatus);
    }
    if (this.props.directionSymbol !== prevProps.directionSymbol) {
      var directionSymbol = this._leafletElement._icon.querySelector('#direction-symbol tspan');
      directionSymbol.innerHTML = this.props.directionSymbol;
    }
    if (this.props.position.lat !== prevProps.position.lat && this.props.position.lng !== prevProps.position.lng) {
      var marker = this.getLeafletElement();
      var deltaLatLng = [this.props.position.lat - prevProps.position.lat, this.props.position.lng - prevProps.position.lng];
      if (document.visibilityState === 'visible') {
        animateMarker(marker, 0, this.props.animateSteps, [ prevProps.position.lat,  prevProps.position.lng], deltaLatLng);
      }
      else {
        this._leafletElement.setLatLng(this.props.position);
      }


    }
    // STRANGER: danger
    // FIXME: What if the vehicle changes routes? The textOffsets will also need to be udpated
  },

});

module.exports = VehicleMarker;
VehicleMarker.propTypes = {
  position: latlngType.isRequired,
  animateSteps: React.PropTypes.number.isRequired,
  heading: React.PropTypes.number.isRequired,
  routeId: React.PropTypes.number.isRequired,
  directionSymbol: React.PropTypes.string.isRequired,
  updateStatus: React.PropTypes.string.isRequired,
}
