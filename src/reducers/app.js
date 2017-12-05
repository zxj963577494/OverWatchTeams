import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  GET_MEMBER_DETAIL_REQUEST,
  GET_MEMBER_DETAIL_SUCCESS,
  GET_MEMBER_DETAIL_FAILED
} from '../constants/actionTypes'

const initialAppState = {
  isFetching: false,
  text: '',
  member: {}
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
    case GET_MEMBER_DETAIL_REQUEST:
      return state
    case GET_MEMBER_DETAIL_SUCCESS:
      return {
        ...state,
        member: action.payload
      }
    case GET_MEMBER_DETAIL_FAILED:
      return state
    default:
      return state
  }
}

export { appReducer }
