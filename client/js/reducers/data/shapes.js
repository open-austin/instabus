import INITIAL_STATE from 'js/reducers/INITIAL_STATE';
import {SET_SHAPE} from 'js/actions/data';


export default function reducer(state = INITIAL_STATE.data.shapes, action = {}) {
  if (action.type === SET_SHAPE) {
    const {shapeId, shape} = action.payload;
    return {
      ...state.shapes,
      [shapeId]: shape,
    };
  }
  return state;
}
