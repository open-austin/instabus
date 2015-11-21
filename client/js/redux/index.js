import {combineReducers} from 'redux';


function ui(state = {}, action = {}) {
    return state;
}

function data(state = {}, action = {}) {
    return state;
}

const rootReducer = combineReducers({
    ui,
    data,
});

export default rootReducer;
