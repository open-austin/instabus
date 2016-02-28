import _ from 'lodash';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {SET_AGENCIES} from 'js/actions/data';

// FIXME: INITIAL_STATE is wrong

export default function reducer(state = INITIAL_STATE.data.agencies, action = {}) {
  if (action.type === SET_AGENCIES) {
    return _.keyBy((action.payload), 'id');
  }
  return state;
}
