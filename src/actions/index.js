import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILED,
  GET_STICKY_ARTICLES_REQUEST,
  GET_STICKY_ARTICLES_SUCCESS,
  GET_STICKY_ARTICLES_FAILED,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
  POST_SIGNUP_REQUEST,
  POST_SIGNUP_SUCCESS,
  POST_SIGNUP_FAILED,
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILED,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  SET_NAVBAR,
  GET_USERINFO_REQUEST,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILED,
  PUT_USERINFO_REQUEST,
  PUT_USERINFO_SUCCESS,
  PUT_USERINFO_FAILED,
  POST_TEAMS_REQUEST,
  POST_TEAMS_SUCCESS,
  POST_TEAMS_FAILED,
  PUT_TEAMS_REQUEST,
  PUT_TEAMS_SUCCESS,
  PUT_TEAMS_FAILED,
  GET_USER_TEAMS_REQUEST,
  GET_USER_TEAMS_SUCCESS,
  GET_USER_TEAMS_FAILED
} from '../constants/actionTypes'

export const getArticlesRequest = function(payload) {
  return { type: GET_ARTICLES_REQUEST, payload }
}

export const getArticlesSuccess = function(payload) {
  return { type: GET_ARTICLES_SUCCESS, payload }
}

export const getArticlesFailed = function(payload) {
  return { type: GET_ARTICLES_FAILED, payload }
}

export const getStickyArticlesRequest = function() {
  return { type: GET_STICKY_ARTICLES_REQUEST }
}

export const getStickyArticlesSuccess = function(payload) {
  return { type: GET_STICKY_ARTICLES_SUCCESS, payload }
}

export const getStickyArticlesFailed = function(payload) {
  return { type: GET_STICKY_ARTICLES_FAILED, payload }
}

export const postLoginRequest = function(payload) {
  return { type: POST_LOGIN_REQUEST, payload }
}

export const postLoginSuccess = function(payload) {
  return { type: POST_LOGIN_SUCCESS, payload }
}

export const postLoginFailed = function(payload) {
  return { type: POST_LOGIN_FAILED, payload }
}

export const postLogoutRequest = function() {
  return { type: POST_LOGOUT_REQUEST }
}

export const postLogoutSuccess = function() {
  return { type: POST_LOGOUT_SUCCESS }
}

export const postLogoutFailed = function() {
  return { type: POST_LOGOUT_FAILED }
}

export const postSignUpRequest = function(payload) {
  return { type: POST_SIGNUP_REQUEST, payload }
}

export const postSignUpSuccess = function(payload) {
  return { type: POST_SIGNUP_SUCCESS, payload }
}

export const postSignUpFailed = function(payload) {
  return { type: POST_SIGNUP_FAILED, payload }
}

export const postUploadRequest = function(payload) {
  return { type: POST_UPLOAD_REQUEST, payload }
}

export const postUploadSuccess = function(payload) {
  return { type: POST_UPLOAD_SUCCESS, payload }
}

export const postUploadFailed = function(payload) {
  return { type: POST_UPLOAD_FAILED, payload }
}

export const fetchRequest = function(payload) {
  return { type: FETCH_REQUEST, payload }
}

export const fetchSuccess = function() {
  return { type: FETCH_SUCCESS }
}

export const fetchFailed = function() {
  return { type: FETCH_FAILED }
}

export const setNavBar = function(payload) {
  return { type: SET_NAVBAR, payload }
}

export const getUserInfoRequest = function() {
  return { type: GET_USERINFO_REQUEST }
}

export const getUserInfoSuccess = function(payload) {
  return { type: GET_USERINFO_SUCCESS, payload }
}

export const getUserInfoFailed = function(payload) {
  return { type: GET_USERINFO_FAILED, payload }
}

export const putUserInfoRequest = function(payload) {
  return { type: PUT_USERINFO_REQUEST, payload }
}

export const putUserInfoSuccess = function(payload) {
  return { type: PUT_USERINFO_SUCCESS, payload }
}

export const putUserInfoFailed = function(payload) {
  return { type: PUT_USERINFO_FAILED, payload }
}

export const postTeamsRequest = function(payload) {
  return { type: POST_TEAMS_REQUEST, payload }
}

export const postTeamsSuccess = function(payload) {
  return { type: POST_TEAMS_SUCCESS, payload }
}

export const postTeamsFailed = function(payload) {
  return { type: POST_TEAMS_FAILED, payload }
}

export const putTeamsRequest = function(payload) {
  return { type: PUT_TEAMS_REQUEST, payload }
}

export const putTeamsSuccess = function(payload) {
  return { type: PUT_TEAMS_SUCCESS, payload }
}

export const putTeamsFailed = function(payload) {
  return { type: PUT_TEAMS_FAILED, payload }
}

export const getTeamsByUserRequest = function() {
  return { type: GET_USER_TEAMS_REQUEST }
}

export const getTeamsByUserSuccess = function(payload) {
  return { type: GET_USER_TEAMS_SUCCESS, payload }
}

export const getTeamsByUserFailed = function(payload) {
  return { type: GET_USER_TEAMS_FAILED, payload }
}
