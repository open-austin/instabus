import { combineReducers } from 'redux';

import InitialState from 'constants/InitialState';
import {
  SET_CURRENT_STOP_GROUP,
} from 'constants/ActionTypes';

function currentStopGroup(state = InitialState.ui.stopList.currentStopGroup, action = {}) {
  if (action.type === SET_CURRENT_STOP_GROUP) {
    return action.payload;
  }
  return state;
}

export default combineReducers({
  currentStopGroup,
});
