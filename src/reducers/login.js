import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED
} from '../constants/actionTypes'

const initialLoginState = {
  username: 'tougao',
  password: '^KwunubASjG@*dV&q)8JZSgB',
  isFetching: false,
  isLogin: false
}

function loginReducer(state = initialLoginState, action) {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
        username: action.payload.username,
        isFetching: true
      }
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLogin: true
      }
    case POST_LOGIN_FAILED:
      return { ...state, isFetching: false }
    case POST_LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case POST_LOGOUT_FAILED:
      return { ...state, isFetching: false }
    case POST_LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLogin: false
      }
    default:
      return state
  }
}

export { loginReducer }
