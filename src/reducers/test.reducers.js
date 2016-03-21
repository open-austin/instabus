import expect from 'expect';

import rootReducer from 'reducers';

import InitialState from 'constants/InitialState';

describe('rootReducer', () => {
  it.only('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'F U' });
    expect(state).toEqual(InitialState);
  });
});
