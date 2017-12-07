import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILED
} from '../constants/actionTypes'

const initialAppState = {
  isFetching: false,
  text: '',
  file: {}
}

function appReducer(state = initialAppState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        text: action.payload.text
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
    case POST_UPLOAD_REQUEST:
      return state
    case POST_UPLOAD_SUCCESS:
      return { ...state, file: action.payload }
    case POST_UPLOAD_FAILED:
      return state
    default:
      return state
  }
}

export { appReducer }
