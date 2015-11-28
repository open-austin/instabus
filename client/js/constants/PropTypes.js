import {PropTypes} from 'react';

export const ArrivalShape = {
  tripId: PropTypes.string,
  arrivalMoment: PropTypes.object,
  routeShortName: PropTypes.string,
  routeLongName: PropTypes.string,
  tripHeadsign: PropTypes.string,
  stopName: PropTypes.string,
};

export const RouteShape = {
  agencyId: PropTypes.string,
  color: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  longName: PropTypes.string,
  shortName: PropTypes.string,
  textColor: PropTypes.string,
  type: PropTypes.number,
  url: PropTypes.string,
};
