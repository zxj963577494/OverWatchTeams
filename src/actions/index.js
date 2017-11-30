import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILED,
  GET_DETAIL_REQUEST,
  GET_DETAIL_SUCCESS,
  GET_DETAIL_FAILED,
  GET_JOKES_REQUEST,
  GET_JOKES_SUCCESS,
  GET_JOKES_FAILED,
  GET_PICTURES_REQUEST,
  GET_PICTURES_SUCCESS,
  GET_PICTURES_FAILED,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILED,
  GET_STICKY_ARTICLES_REQUEST,
  GET_STICKY_ARTICLES_SUCCESS,
  GET_STICKY_ARTICLES_FAILED,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
  POST_PAGECOUNT_REQUEST,
  CHANGE_TABBAR,
  SET_NAVBAR
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

export const getJokesRequest = function(payload) {
  return { type: GET_JOKES_REQUEST, payload }
}

export const getJokesSuccess = function(payload) {
  return { type: GET_JOKES_SUCCESS, payload }
}

export const getJokesFailed = function(payload) {
  return { type: GET_JOKES_FAILED, payload }
}

export const getPicturesRequest = function(payload) {
  return { type: GET_PICTURES_REQUEST, payload }
}

export const getPicturesSuccess = function(payload) {
  return { type: GET_PICTURES_SUCCESS, payload }
}

export const getPicturesFailed = function(payload) {
  return { type: GET_PICTURES_FAILED, payload }
}

export const getDetailRequest = function(payload) {
  return { type: GET_DETAIL_REQUEST, payload }
}

export const getDetailSuccess = function(payload) {
  return { type: GET_DETAIL_SUCCESS, payload }
}

export const getDetailFailed = function(payload) {
  return { type: GET_DETAIL_FAILED, payload }
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

export const getCommentsRequest = function(payload) {
  return { type: GET_COMMENTS_REQUEST, payload }
}

export const getCommentsSuccess = function(payload) {
  return { type: GET_COMMENTS_SUCCESS, payload }
}

export const getCommentsFailed = function(payload) {
  return { type: GET_COMMENTS_FAILED, payload }
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
  return { type: POST_LOGOUT_REQUEST}
}

export const postLogoutSuccess = function() {
  return { type: POST_LOGOUT_SUCCESS}
}

export const postLogoutFailed = function() {
  return { type: POST_LOGOUT_FAILED}
}

export const postPageCountRequest = function(payload) {
  return { type: POST_PAGECOUNT_REQUEST, payload}
}

export const changeTabBar = function(payload) {
  return { type: CHANGE_TABBAR, payload }
}

export const setNavBar = function(payload) {
  return { type: SET_NAVBAR, payload }
}