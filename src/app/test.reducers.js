import expect from 'expect';

import reducer from 'app/reducers';

import INITIAL_STATE from 'constants/INITIAL_STATE';

describe('app/reducers', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'F U' });
    expect(state).toEqual(INITIAL_STATE);
  });
});
