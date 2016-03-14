import expect from 'expect';

import { stopsForRouteSelector } from 'stops/StopList';

describe('StopList', () => {
  describe('stopsForRouteSelector', () => {
    it('selects no stops', () => {
      const state = {
        currentRoute: null,
        stops: {
          stopsForRoute: {
            6: [1, 2, 3],
          },
        },
      };

      expect(stopsForRouteSelector(state)).toNotExist();
    });

    it('selects the stops', () => {
      const state = {
        currentRoute: 6,
        stops: {
          stopsForRoute: {
            6: [1, 2, 3],
          },
        },
      };

      expect(stopsForRouteSelector(state)).toEqual(
        [1, 2, 3]
      );
    });
  });
});
