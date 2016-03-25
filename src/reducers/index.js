import { combineReducers } from 'redux';

import ui from 'reducers/ui';
import oba from 'reducers/oba';

export default combineReducers({
  ui,
  oba,
});
