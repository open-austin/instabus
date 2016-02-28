import {combineReducers} from 'redux';

import ui, * as uiActions from './ui';
import data, * as dataActions from './data';

export default combineReducers({
  ui,
  data,
});

export {uiActions as ui, dataActions as data};
