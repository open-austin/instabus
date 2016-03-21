import expect from 'expect';

import reducer from 'app/reducers';

import InitialState from 'constants/InitialState';

describe('app/reducers', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, { type: 'F U' });
    expect(state).toEqual(InitialState);
  });
});
