import {PropTypes} from 'react';

// OneBusAway REST API PropTypes

// Generated from OneBusAway models with grep, send and ctl + f
// https://github.com/OneBusAway/onebusaway-application-modules/tree/3bee16af29cbde556de7eaba59b44c2bfaf411cf/onebusaway-transit-data/src/main/java/org/onebusaway/transit_data/model

// I can't figure out what type this would be serialized as
// Its always null when I call an API
// https://github.com/OneBusAway/onebusaway-application-modules/blob/3bee16af29cbde556de7eaba59b44c2bfaf411cf/onebusaway-api-core/src/main/java/org/onebusaway/api/model/transit/TimeIntervalV2.java
const TimeIntervalType = PropTypes.any;

export const AgencyType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  timezone: PropTypes.string,
  lang: PropTypes.string,
  phone: PropTypes.string,
  disclaimer: PropTypes.string,
  privateService: PropTypes.bool,
});

export const AgencyWithCoverageType = PropTypes.shape({
  agencyId: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
  latSpan: PropTypes.number,
  lonSpan: PropTypes.number,
});

export const FrequencyType = PropTypes.shape({
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  headway: PropTypes.number,
});

export const CoordinatePointType = PropTypes.shape({
  lat: PropTypes.number,
  lon: PropTypes.number,
});

export const TripStatusType = PropTypes.shape({
  activeTripId: PropTypes.string,
  serviceDate: PropTypes.number,
  frequency: FrequencyType,
  scheduledDistanceAnumberTrip: PropTypes.number,
  totalDistanceAnumberTrip: PropTypes.number,
  position: CoordinatePointType,
  orientation: PropTypes.number,
  closestStop: PropTypes.string,
  closestStopTimeOffset: PropTypes.number,
  nextStop: PropTypes.string,
  nextStopTimeOffset: PropTypes.number,
  phase: PropTypes.string,
  status: PropTypes.string,
  lastUpdateTime: PropTypes.number,
  lastLocationUpdateTime: PropTypes.number,
  lastKnownDistanceAnumberTrip: PropTypes.number,
  lastKnownLocation: CoordinatePointType,
  lastKnownOrientation: PropTypes.number,
  scheduleDeviation: PropTypes.number,
  distanceAnumberTrip: PropTypes.number,
  vehicleId: PropTypes.string,
});

export const ArrivalAndDepartureType = PropTypes.shape({
  routeId: PropTypes.string,
  tripId: PropTypes.string,
  serviceDate: PropTypes.number,
  vehicleId: PropTypes.string,
  stopId: PropTypes.string,
  stopSequence: PropTypes.number,
  routeShortName: PropTypes.string,
  routenumberName: PropTypes.string,
  tripHeadsign: PropTypes.string,
  departureEnabled: PropTypes.bool,
  scheduledDepartureTime: PropTypes.number,
  scheduledDepartureInterval: TimeIntervalType,
  predictedDepartureTime: PropTypes.number,
  predictedDepartureInterval: TimeIntervalType,
  arrivalEnabled: PropTypes.bool,
  scheduledArrivalTime: PropTypes.number,
  scheduledArrivalInterval: TimeIntervalType,
  frequency: FrequencyType,
  status: PropTypes.string,
  lastUpdateTime: PropTypes.number,
  predictedArrivalTime: PropTypes.number,
  predictedArrivalInterval: TimeIntervalType,
  distanceFromStop: PropTypes.number,
  numberOfStopsAway: PropTypes.number,
  tripStatus: TripStatusType,
});

export const EntryWithReferencesType = PropTypes.shape({
  references: PropTypes.object,
  entry: PropTypes.object,
});

export const ListWithReferencesType = PropTypes.shape({
  references: PropTypes.object,
});

export const RegisteredAlarmType = PropTypes.shape({
  alarmId: PropTypes.string,
});

export const RouteType = PropTypes.shape({
  id: PropTypes.string,
  shortName: PropTypes.string,
  numberName: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.number,
  url: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  agencyId: PropTypes.string,
});

export const ScheduleFrequencyInstanceType = PropTypes.shape({
  serviceDate: PropTypes.number,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  headway: PropTypes.number,
  serviceId: PropTypes.string,
  tripId: PropTypes.string,
  stopHeadsign: PropTypes.string,
  arrivalEnabled: PropTypes.bool,
  departureEnabled: PropTypes.bool,
});

export const ScheduleStopTimeInstanceType = PropTypes.shape({
  arrivalEnabled: PropTypes.bool,
  arrivalTime: PropTypes.number,
  departureEnabled: PropTypes.bool,
  departureTime: PropTypes.number,
  serviceId: PropTypes.string,
  tripId: PropTypes.string,
  stopHeadsign: PropTypes.string,
});

export const StopCalendarDayType = PropTypes.shape({
  date: PropTypes.number,
  group: PropTypes.number,
});

export const StopCalendarType = PropTypes.shape({
  stopId: PropTypes.string,
  timeZone: PropTypes.string,
});

export const StopRouteDirectionScheduleType = PropTypes.shape({
  tripHeadsign: PropTypes.string,
});

export const StopRouteScheduleType = PropTypes.shape({
  routeId: PropTypes.string,
});

export const StopScheduleType = PropTypes.shape({
  date: PropTypes.number,
  stopId: PropTypes.string,
});

export const StopType = PropTypes.shape({
  id: PropTypes.string,
  lat: PropTypes.number,
  lon: PropTypes.number,
  direction: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
  locationType: PropTypes.number,
  wheelchairBoarding: PropTypes.oneOf(['UNKNOWN', 'ACCESSIBLE', 'NOT_ACCESSIBLE']),
});

export const StopWithArrivalsAndDeparturesType = PropTypes.shape({
  stopId: PropTypes.string,
});

export const StopsForRouteType = PropTypes.shape({
  routeId: PropTypes.string,
});

export const TripStopTimesType = PropTypes.shape({
  timeZone: PropTypes.string,
  previousTripId: PropTypes.string,
  nextTripId: PropTypes.string,
  frequency: FrequencyType,
});

export const TripDetailsType = PropTypes.shape({
  tripId: PropTypes.string,
  serviceDate: PropTypes.number,
  frequency: FrequencyType,
  status: TripStatusType,
  schedule: TripStopTimesType,
});

export const TripStopTimeType = PropTypes.shape({
  arrivalTime: PropTypes.number,
  departureTime: PropTypes.number,
  stopId: PropTypes.string,
  stopHeadsign: PropTypes.string,
  distanceAnumberTrip: PropTypes.number,
});

export const TripType = PropTypes.shape({
  id: PropTypes.string,
  routeId: PropTypes.string,
  routeShortName: PropTypes.string,
  tripShortName: PropTypes.string,
  tripHeadsign: PropTypes.string,
  serviceId: PropTypes.string,
  shapeId: PropTypes.string,
  timeZone: PropTypes.string,
  directionId: PropTypes.string,
  blockId: PropTypes.string,
});

export const VehicleLocationRecordType = PropTypes.shape({
  serviceDate: PropTypes.number,
  blockId: PropTypes.string,
  tripId: PropTypes.string,
  vehicleId: PropTypes.string,
  timeOfRecord: PropTypes.number,
  timeOfLocationUpdate: PropTypes.number,
  scheduleDeviation: PropTypes.number,
  distanceAnumberBlock: PropTypes.number,
  currentLocation: CoordinatePointType,
  currentOrientation: PropTypes.number,
  phase: PropTypes.string,
  status: PropTypes.string,
});

export const VehicleStatusType = PropTypes.shape({
  vehicleId: PropTypes.string,
  phase: PropTypes.string,
  status: PropTypes.string,
  lastUpdateTime: PropTypes.number,
  lastLocationUpdateTime: PropTypes.number,
  location: CoordinatePointType,
  tripId: PropTypes.string,
  tripStatus: TripStatusType,
});
