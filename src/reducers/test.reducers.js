import expect from 'expect';

import rootReducer from 'reducers';

import InitialState from 'constants/InitialState';

import InitialState801 from './test-fixtures/InitialState.801';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'F U' });
    expect(state).toEqual(InitialState);
  });

  it('should use the initial state', () => {
    const state = rootReducer(InitialState801, { type: 'F U' });
    expect(state).toEqual(InitialState801);
  });
});
