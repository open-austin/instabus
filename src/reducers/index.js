import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ui from 'reducers/ui';
import oba from 'reducers/oba';


export default combineReducers({
  ui,
  oba,
  routing: routerReducer,
});
