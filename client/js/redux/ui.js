const SET_PAGE = 'instabus/ui/SET_PAGE';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
  case SET_PAGE:
    return Object.assign({}, state, {
      page: action.page,
    });
  default:
    return state;
  }
}


export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}
