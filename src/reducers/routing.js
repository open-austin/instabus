import _ from 'lodash';

import { locationParser } from 'libs/routing';
import InitialState from 'constants/InitialState';
import { SET_PATHNAME } from 'constants/ActionTypes';

import { STOP_LIST_TAB, NOT_FOUND_TAB } from 'constants/TabNames';
import * as TAB_NAMES from 'constants/TabNames';


function stopListReducer(pathname) {
  const match = locationParser('/route/:routeId?/stop/:stopGroupId?/:stopId?', pathname);
  if (match) {
    return _.omitBy({
      tab: STOP_LIST_TAB.name,
      routeId: match.routeId,
      stopGroupId: match.stopGroupId,
      stopId: match.stopId,
    }, _.isUndefined);
  }
}

function tabReducer(pathname) {
  const tabRoute = locationParser('/:tab', pathname);
  if (tabRoute) {
    const matchingTab = _.find(
      TAB_NAMES,
      (tab) => tab.name === tabRoute.tab
    ) || NOT_FOUND_TAB;

    return {
      tab: matchingTab.name,
    };
  }
}

export default function reducer(state = InitialState.routing, action = {}) {
  if (action.type === SET_PATHNAME) {
    const pathname = action.payload;
    return stopListReducer(pathname) || tabReducer(pathname) || state;
  }

  return state;
}
