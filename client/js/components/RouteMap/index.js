import React, {Component, PropTypes} from 'react';
import {Map as ReactLeafletMap, Polyline, Popup, TileLayer, Marker} from 'react-leaflet';
import polyline from 'polyline';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';


import {AUSTIN_LAT_LNG} from 'js/constants/Map';

// import VehicleMarker from './VehicleMarker';
// import StopMarker from './StopMarker';
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
    const attribution = '<a href="http://openstreetmap.org">OpenStreetMap</a> | <a href="http://mapbox.com">Mapbox</a>';

    const polylineLayers = this.props.polylines.map((poly, i) => (
        <Polyline
          positions={poly}
          key={i}
          color="rgb(130, 127, 122)"
          stroke
          weight={5}
          opacity={0.3}
          smoothFactor={1}
        />
      )
    );
    return (
      <ReactLeafletMap
        center={AUSTIN_LAT_LNG}
        zoom={13}
        id="map"
      >
        <TileLayer
          url="https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png"
          attribution={attribution}
          id="drmaples.ipbindf8"
        />
        {polylineLayers}
        <Marker position={AUSTIN_LAT_LNG}>
          <Popup>
            <span>A pretty CSS3 popup. Easily customizable.</span>
          </Popup>
        </Marker>
      </ReactLeafletMap>
    );
  }
}

RouteMap.propTypes = {
  routeId: PropTypes.string.isRequired,
  // routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  // stops: PropTypes.arrayOf(PropTypes.object).isRequired,
  polylines: PropTypes.array.isRequired,
  // vehicles: PropTypes.arrayOf(PropTypes.object).isRequired,
  // fleetUpdateTime: PropTypes.string.isRequired,
};

const tripsDetailsSelector = createSelector(
  (state, props) => state.data.routes[props.routeId],
  (state) => state.data.tripsDetailsForRoute,
  (route, TripsDetailsForRoute) => {
    if (!route) {
      return [];
    }
    return TripsDetailsForRoute[route.id] || [];
  }
);

const tripIdsSelector = createSelector(
  tripsDetailsSelector,
  (tripsDetails) => tripsDetails.map(tripDetails => tripDetails.tripId)
);

const tripsSelector = createSelector(
  tripIdsSelector,
  (state) => state.data.trips,
  (tripIds, trips) => tripIds.reduce((result, tripId) => {
    const trip = trips[tripId];
    if (trip) {
      return [...result, trip];
    }
    return result;
  }, [])
);

const shapesSelector = createSelector(
  tripsSelector,
  (state) => state.data.shapes,
  (trips, shapes) => {
    return trips.reduce((result, trip) => {
      const shape = shapes[trip.shapeId];
      if (shape) {
        return [...result, shape];
      }
      return result;
    }, []);
  }
);

const polylinesSelector = createSelector(
  shapesSelector,
  (shapes) => shapes.map(shape => polyline.decode(shape.points))
);

const mapStateToProps = createSelector(
  polylinesSelector,
  (polylines) => {
    return {
      polylines,
    };
  }
);

export default connect(mapStateToProps)(RouteMap);
