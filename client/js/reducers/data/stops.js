import _ from 'lodash';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {SET_STOPS} from 'js/actions/data';


export default function reducer(state = INITIAL_STATE.data.stops, action = {}) {
  if (action.type === SET_STOPS) {
    return _.keyBy((action.payload), 'id');
  }
  return state;
}
