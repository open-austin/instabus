import expect from 'expect';

import routingReducer from 'reducers/routing';
import InitialState from 'constants/InitialState';
import { SET_PATHNAME } from 'constants/ActionTypes';

describe('reducers/routing', () => {
  it('should return initial state', () => {
    const state = routingReducer(undefined, { type: 'F U' });
    expect(state).toEqual(InitialState.routing);
  });

  it('should use the initial state', () => {
    const state = routingReducer({ bird: 'word' }, { type: 'F U' });
    expect(state).toEqual({ bird: 'word' });
  });

  it('should handle /route', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/route' });
    expect(state).toEqual({ tab: 'route' });
  });

  it('should handle /route/:routeId/stop', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/route/routeId/stop' });
    expect(state).toEqual({
      tab: 'stop',
      routeId: 'routeId',
    });
  });

  it('should handle /route/:routeId/stop/:stopGroupId', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/route/routeId/stop/stopGroupId' });
    expect(state).toEqual({
      tab: 'stop',
      routeId: 'routeId',
      stopGroupId: 'stopGroupId',
    });
  });

  it('should handle /route/:routeId/stop/:stopGroupId/:stopId', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/route/routeId/stop/stopGroupId/stopId' });
    expect(state).toEqual({
      tab: 'stop',
      routeId: 'routeId',
      stopGroupId: 'stopGroupId',
      stopId: 'stopId',
    });
  });

  it('should handle /route', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/route' });
    expect(state).toEqual({ tab: 'route' });
  });

  it('should handle /saved', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/saved' });
    expect(state).toEqual({ tab: 'saved' });
  });

  it('should handle 404 tabs /asoidjfwoiejfiowjef', () => {
    const state = routingReducer(undefined, { type: SET_PATHNAME, payload: '/asoidjfwoiejfiowjef' });
    expect(state).toEqual({ tab: '404' });
  });
});
