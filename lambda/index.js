var rp = require('request-promise');
var _ = require('lodash');
var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();
module.exports = api;

function vehicleDirection(name) {
  var stopDirection = null;
  if (name.indexOf('NB') > -1) {
    stopDirection = 'northbound';
  }
  else if (name.indexOf('SB') > -1) {
    stopDirection = 'southbound';
  }
  else if (name.indexOf('EB') > -1) {
    stopDirection = 'eastbound';
  }
  else if (name.indexOf('WB') > -1) {
    stopDirection = 'westbound';
  }
  else if (name.indexOf('IB') > -1) {
    stopDirection = 'inbound';
  }
  else if (name.indexOf('OB') > -1) {
    stopDirection = 'outbound';
  }
  return stopDirection;
}

api.get('/vehicles-for-agency/{agencyId}', function(request) {
  var agencyId = request.pathParams.agencyId;
  var getVehicles = {
    uri: 'http://52.88.82.199:8080/onebusaway-api-webapp/api/where/vehicles-for-agency/' + agencyId + '.json',
    qs: {
      key: 'TEST',
    },
    json: true,
  };
  var allVehicles, shapeIds, tripIds;
  return rp(getVehicles)
    .then(function(json) {
      var routes = _(json.data.references.routes).keyBy('id').value();
      var trips = _(json.data.references.trips).keyBy('id').value();
      allVehicles = _(json.data.list)
        .filter(function(vehicle) { 
          return vehicle.tripStatus 
        })
        .map(function(vehicle) {
          return _.assign(vehicle, {
            route: {
              id: trips[vehicle.tripId].routeId,
              shortName: routes[trips[vehicle.tripId].routeId].shortName,
              direction: vehicleDirection(trips[vehicle.tripId].tripHeadsign),
            },
          })  
        })
        .value();
      shapeIds = _(allVehicles)
        .map(function(vehicle) {
          return {
            id: trips[vehicle.tripId].shapeId,
            routeId: vehicle.route.id,
            tripId: vehicle.tripId,
          }
        })
        .uniq()
        .value();
      tripIds = _(allVehicles)
        .map(function(vehicle) {
          return vehicle.tripId
        })
        .uniq()
        .value();
      var shapeRequests = shapeIds.map(function(shapeId) {
        var getShapes = {
          uri: 'http://52.88.82.199:8080/onebusaway-api-webapp/api/where/shape/' + shapeId.id + '.json',
          qs: {
            key: 'TEST',
          },
          json: true,
        };
        return rp(getShapes)
      })
      var tripRequests = tripIds.map(function(tripId) {
        var getTrips = {
          uri: 'http://52.88.82.199:8080/onebusaway-api-webapp/api/where/trip-details/' + tripId + '.json',
          qs: {
            key: 'TEST',
          },
          json: true,
        };
        return rp(getTrips)
      })
      return Promise.all([Promise.all(shapeRequests), Promise.all(tripRequests)]);
    })
    .then(function(responses) {
      var shapes = responses[0].map(function(response, i) {
        var shape = shapeIds[i]
        shape.points = response.data.entry.points
        return shape;
      })
      var stops = []
      responses[1].forEach(function(response) {
        var stopsById = _(response.data.references.stops).keyBy('id').value();
        var stopsForTrip = response.data.entry.schedule.stopTimes.map(function(stopTime) {
          return stopsById[stopTime.stopId];
        });
        stops = stops.concat(stopsForTrip)
      })
      stops = _(stops).uniqBy('id').value()
      var vehicles = {
        shapes,
        stops,
        allVehicles,
      };
      return vehicles;
    })
});
