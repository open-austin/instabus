import {PropTypes} from 'react';

export const ArrivalShape = {
  tripId: PropTypes.string,
  arrivalMoment: PropTypes.object,
  routeShortName: PropTypes.string,
  routeLongName: PropTypes.string,
  tripHeadsign: PropTypes.string,
  stopName: PropTypes.string,
};
