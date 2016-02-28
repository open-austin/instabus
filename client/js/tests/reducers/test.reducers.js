import expect from 'expect';

import rootReducer from 'js/reducers';
import INITIAL_STATE from 'js/reducers/INITIAL_STATE';

describe('reducers/rootReducer', () => {
  it('should be equal to initial state', () => {
    expect(rootReducer({}, {})).toEqual(INITIAL_STATE);
  });
});
