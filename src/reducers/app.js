import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED
} from '../constants/actionTypes'

const initialAppState = {
  isFetching: false
}

function appReducer(state = initialAppState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case FETCH_FAILED:
      return {
        ...state,
        isFetching: false
      }
    default:
      return state
  }
}

export { appReducer }
