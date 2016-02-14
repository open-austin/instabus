import React, {Component, PropTypes} from 'react';
import Leaflet from 'leaflet';
import {connect} from 'react-redux';
import {Map, Popup, TileLayer, Marker} from 'react-leaflet';

// import VehicleMarker from './VehicleMarker';
// import StopMarker from './StopMarker';
import RoutePolyline from './RoutePolyline';
// import MapLegend from './MapLegend';

//
// function renderStopMarker(stop) {
//   if (!stop) {
//     return;
//   }
//   return (
//     <StopMarker
//       center={{lat: stop.lat, lng: stop.lon}}
//       key={'stop:' + stop.stopId}
//       label={stop.name}
//       radius={8}
//       opacity={1}
//       width={2}
//       color='rgb(142,139,139)'
//       fillColor='rgb(166,163,163)'
//       fill={true}
//       fillOpacity={0.7} />
//   );
// }
//
function renderPolylineLayer(polyline) {
  return (
    <RoutePolyline
    positions={polyline.positions}
    key={'polyline:' + polyline.shape_id}
    color='rgb(130,127,122)'
    stroke={true}
    weight={5}
    opacity={0.3}
    smoothFactor={1} />
  );
}

// function renderVehicleMarker(vehicle) {
//   if (!vehicle) {
//     return;
//   }
//   return (
//     <VehicleMarker
//     position={vehicle.position}
//     key={'vehicle:' + vehicle.vehicleId}
//     className='vehicle-marker'
//     vehicleUpdateStatus={vehicle.vehicleUpdateStatus}
//     heading={vehicle.heading}
//     routeId={vehicle.routeId}
//     directionSymbol={vehicle.directionSymbol}
//     updateStatus={vehicle.updateStatus}
//     animateSteps={200}>
//       <Popup>
//         <div>{vehicle.vehicleId} {vehicle.updateTime} {vehicle.formattedUpdateTime}</div>
//       </Popup>
//     </VehicleMarker>
//   );
// }


class RouteMap extends Component {
  render() {
    const position = [51.505, -0.09];

    // var polylineLayers = this.props.polylines.map(renderPolylineLayer);
    return (
      <Map center={position} zoom={13}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );

    // return (
    //   <div id='map-wrapper'>
    //     <Map
    //       center={this.props.initialPosition}
    //       zoom={13}
    //       id='map'
    //     >
    //       <TileLayer
    //         url='https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png'
    //         attribution='<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>'
    //         id='drmaples.ipbindf8'
    //       />
    //     </Map>
    //   </div>
    // );
  }
}

RouteMap.propTypes =  {
  // routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  // stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  polylines: PropTypes.arrayOf(PropTypes.object).isRequired,
  // vehicles: PropTypes.arrayOf(PropTypes.object).isRequired,
  // fleetUpdateTime: PropTypes.string.isRequired,
};

function mapStateToProps() {
  return {
    polylines: [],
  };
}

export default connect(mapStateToProps)(RouteMap);
