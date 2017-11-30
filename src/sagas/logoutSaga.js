import { put, fork, take } from 'redux-saga/effects'
import Cookies from 'universal-cookie'
import { replace } from 'react-router-redux'
import { POST_LOGOUT_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'

function* postLogoutWorker(payload) {
  try {
    yield fork(cleanCookies)
    yield put(action.postLogoutSuccess())
    yield put(replace('/home'))
  } catch (error) {
    yield put(action.postLoginFailed(error))
  }
}

function cleanCookies() {
  const cookies = new Cookies()
  cookies.remove('token')
}

function* watchLogout() {
  while (true) {
    const { payload } = yield take(POST_LOGOUT_REQUEST)
    yield fork(postLogoutWorker, payload)
  }
}

export { watchLogout }
