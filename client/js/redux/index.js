import {combineReducers} from 'redux';

import ui from './ui';

function data(state = {}, action = {}) {
  return state;
}

const rootReducer = combineReducers({
  ui,
  data,
});

export default rootReducer;
