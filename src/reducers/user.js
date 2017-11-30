import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAILED
} from '../constants/actionTypes'

const initialUserState = {
  loginError: '',
  signupError: ''
}

function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return { ...state, loginError: '' }
    case POST_LOGIN_SUCCESS:
      return { ...state, loginError: '' }
    case POST_LOGIN_FAILED:
      return { ...state, loginError: action.payload.rawMessage }
    case POST_SIGNUP_REQUEST:
      return { ...state, signupError: '' }
    case POST_SIGNUP_SUCCESS:
      return { ...state, signupError: '' }
    case POST_SIGNUP_FAILED:
      return { ...state, signupError: action.payload.rawMessage }
    default:
      return state
  }
}

export { userReducer }
