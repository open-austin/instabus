import { combineReducers } from 'redux';

import {
  SET_ALL_ROUTES,
  SET_ALL_ROUTES_LOADING,
} from 'routes/RouteListActions';


function allRoutes(state = {}, action = {}) {
  if (action.type === SET_ALL_ROUTES) {
    return action.payload;
  }
  return state;
}

function allRoutesLoading(state = false, action = {}) {
  if (action.type === SET_ALL_ROUTES_LOADING) {
    return action.payload;
  }
  return state;
}


export default combineReducers({
  allRoutes,
  allRoutesLoading,
});
