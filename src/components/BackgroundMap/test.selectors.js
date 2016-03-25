import expect from 'expect';

import { vehiclesSelector } from 'components/BackgroundMap/selectors';

describe('BackgroundMap/selectors', () => {
  describe('vehiclesSelector', () => {
    const state = {
      ui: {
        currentRoute: 'route_69',
      },
      oba: {
        vehicles: {
          vehicle_5: { vehicleId: 'vehicle_5', tripId: 'trip_5' },
          vehicle_6: { vehicleId: 'vehicle_6', tripId: 'trip_6' },
          vehicle_7: { vehicleId: 'vehicle_7', tripId: 'trip_7' },
        },
        references: {
          trips: {
            trip_5: { routeId: 'route_69' },
            trip_6: { routeId: 'route_69' },
            trip_7: { routeId: 'route_7' },
          },
        },
      },
    };

    it('should select all the vehicles', () => {
      expect(vehiclesSelector({
        ...state,
        ui: { currentRoute: null },
      }))
        .toEqual([
          { vehicleId: 'vehicle_5', tripId: 'trip_5' },
          { vehicleId: 'vehicle_6', tripId: 'trip_6' },
          { vehicleId: 'vehicle_7', tripId: 'trip_7' },
        ]);
    });

    it('should select the vehicles for the current route', () => {
      expect(vehiclesSelector(state))
        .toEqual([
          { vehicleId: 'vehicle_5', tripId: 'trip_5' },
          { vehicleId: 'vehicle_6', tripId: 'trip_6' },
        ]);
    });
  });
});
