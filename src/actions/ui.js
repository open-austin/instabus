import {
  SET_GLOBAL_ERROR,
  SET_REACT_LOADED,
  SET_ROUTES_MODAL,
  SET_SAVED_MODAL,
  SET_STOPS_MODAL,
} from 'constants/ActionTypes';

export function setGlobalError(errorMessage) {
  return {
    type: SET_GLOBAL_ERROR,
    payload: errorMessage,
  };
}

export function setReactLoaded() {
  return {
    type: SET_REACT_LOADED,
  };
}

export function setRoutesModal(visible) {
  return {
    type: SET_ROUTES_MODAL,
    payload: visible,
  };
}

export function setSavedModal(visible) {
  return {
    type: SET_SAVED_MODAL,
    payload: visible,
  };
}

export function setStopsModal(visible) {
  return {
    type: SET_STOPS_MODAL,
    payload: visible,
  };
}
