import {PropTypes} from 'react';

export const TripDetailShape = PropTypes.shape({
  tripId: PropTypes.string,
  routeShortName: PropTypes.string,
  routeLongName: PropTypes.string,
  tripHeadsign: PropTypes.string,
  nextStopName: PropTypes.string,
  nextStopArrivalMoment: PropTypes.object,
  closestStopName: PropTypes.string,
  closestStopArrivalMoment: PropTypes.object,
  scheduleDeviation: PropTypes.number,
});

export const RouteShape = PropTypes.shape({
  agencyId: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  longName: PropTypes.string,
  shortName: PropTypes.string,
  textColor: PropTypes.string,
  type: PropTypes.number,
  url: PropTypes.string,
});
