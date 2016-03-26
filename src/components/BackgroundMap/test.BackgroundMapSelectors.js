import expect from 'expect';

import {
  vehiclesSelector,
  stopIdsSelector,
  polylinesSelector,
} from 'components/BackgroundMap/BackgroundMapSelectors';

describe('BackgroundMap/BackgroundMapSelectors', () => {
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

  describe('stopGroups', () => {
    const state = {
      ui: {
        currentRoute: 'route_69',
      },
      oba: {
        stopGroups: {
          route_69: {
            0: {
              polylines: ['polyline1'],
              stopIds: ['stop_123'],
            },
            1: {
              polylines: ['polyline2'],
              stopIds: ['stop_456', 'stop_789'],
            },
          },
        },
      },
    };

    describe('stopIdsSelector', () => {
      it('should select nothing', () => {
        expect(stopIdsSelector({
          ...state,
          ui: { currentRoute: null },
        }))
          .toEqual([]);
      });

      it('should select the stops for the current route', () => {
        expect(stopIdsSelector(state))
          .toEqual(['stop_123', 'stop_456', 'stop_789']);
      });
    });

    describe('polylinesSelector', () => {
      it('should select nothing', () => {
        expect(polylinesSelector({
          ...state,
          ui: { currentRoute: null },
        }))
          .toEqual([]);
      });

      it('should select the stops for the current route', () => {
        expect(polylinesSelector(state))
          .toEqual(['polyline1', 'polyline2']);
      });
    });
  });
});
