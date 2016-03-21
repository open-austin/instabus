import expect from 'expect';

import { sortedRoutesSelector } from 'selectors/oba';

describe('selectors/oba', () => {
  describe('sortedRoutesSelector', () => {
    it('should sort the routes', () => {
      const state = {
        oba: {
          references: {
            routes: {
              '1_6': { shortName: '6' },
              '1_1': { shortName: '1' },
              '1_2': { shortName: '2' },
            },
          },
        },
      };

      expect(sortedRoutesSelector(state)).toEqual(
        [{ shortName: '1' }, { shortName: '2' }, { shortName: '6' }]
      );
    });
  });
});
