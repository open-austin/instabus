import { combineReducers } from 'redux';

import ui from 'reducers/ui';
import oba from 'reducers/oba';
import routing from 'reducers/routing';

export default combineReducers({
  ui,
  oba,
  routing,
});
