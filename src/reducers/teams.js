import {
  POST_TEAMS_REQUEST,
  POST_TEAMS_SUCCESS,
  POST_TEAMS_FAILED,
  PUT_TEAMS_REQUEST,
  PUT_TEAMS_SUCCESS,
  PUT_TEAMS_FAILED,
  GET_USER_TEAMS_REQUEST,
  GET_USER_TEAMS_SUCCESS,
  GET_USER_TEAMS_FAILED,
  DELETE_TEAM_MEMBER_REQUEST,
  DELETE_TEAM_MEMBER_SUCCESS,
  DELETE_TEAM_MEMBER_FAILED,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAILED
} from '../constants/actionTypes'

const initialUserTeamsInfoState = {
  list: [],
  pending: false
}

function userTeamsReducer(state = initialUserTeamsInfoState, action) {
  switch (action.type) {
    case POST_TEAMS_REQUEST:
      return { ...state, pending: true }
    case POST_TEAMS_SUCCESS:
      return { ...state, pending: false }
    case POST_TEAMS_FAILED:
      return { ...state, pending: false }
    case PUT_TEAMS_REQUEST:
      return { ...state, pending: true }
    case PUT_TEAMS_SUCCESS:
      return { ...state, pending: false }
    case PUT_TEAMS_FAILED:
      return { ...state, pending: false }
    case GET_USER_TEAMS_REQUEST:
      return state
    case DELETE_TEAM_MEMBER_REQUEST:
      return state
    case DELETE_TEAM_MEMBER_SUCCESS:
      return state
    case DELETE_TEAM_MEMBER_FAILED:
      return state
    case DELETE_TEAM_REQUEST:
      return state
    case DELETE_TEAM_SUCCESS:
      return state
    case DELETE_TEAM_FAILED:
      return state
    case GET_USER_TEAMS_SUCCESS:
      return { ...state, list: [].concat(...action.payload) }
    case GET_USER_TEAMS_FAILED:
      return state
    default:
      return state
  }
}

export { userTeamsReducer }
