import _ from 'lodash';

import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {SET_ROUTES} from 'js/actions/data';


export default function reducer(state = INITIAL_STATE.data.routes, action = {}) {
  if (action.type === SET_ROUTES) {
    return _.keyBy((action.payload), 'id');
  }
  return state;
}
