import {combineReducers} from 'redux-immutablejs';

import ui, * as uiActions from './ui';
import data, * as dataActions from './data';

const rootReducer = combineReducers({
  ui,
  data,
});

export default rootReducer;

export {uiActions as ui, dataActions as data};
