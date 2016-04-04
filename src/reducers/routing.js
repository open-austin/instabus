import _ from 'lodash';

import { locationParser } from 'libs/routing';
import InitialState from 'constants/InitialState';
import { SET_PATHNAME } from 'constants/ActionTypes';

import { STOP_LIST_TAB } from 'constants/TabNames';
import * as TAB_NAMES from 'constants/TabNames';

export default function reducer(state = InitialState.routing, action = {}) {
  if (action.type === SET_PATHNAME) {
    console.log('SET_PATHNAME', action.payload)
    // /route/:routeId/stops
    // /route/:routeId/stops/:stopGroupId
    // /route/:routeId/stops/:stopGroupId/:stopId
    const stopListMatch = locationParser('/route/:routeId?/stop/:stopGroupId?/:stopId?', action.payload);
    if (stopListMatch) {
      return {
        ...state,
        tab: STOP_LIST_TAB.name,
        routeId: stopListMatch.routeId,
        stopGroupId: stopListMatch.stopGroupId,
        stopId: stopListMatch.stopId,
      };
    }

    // /route
    // /help
    // /saved
    // /nearby
    // /recent
    const tabMatch = locationParser('/:tab', action.payload);
    console.log('tabMatch', tabMatch);
    if (tabMatch) {
      return {
        ...state,
        tab: _.find(TAB_NAMES, (tab) => tab.name === tabMatch.tab).name,
      };
    }

    return state;
  }

  return state;
}
