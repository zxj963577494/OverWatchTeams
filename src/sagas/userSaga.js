import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import {
  POST_SIGNUP_REQUEST,
  POST_LOGIN_REQUEST,
  POST_LOGOUT_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* postSignUpWorker(payload) {
  try {
    yield put(action.fetchRequest())
    const response = yield call(user.signUp, payload)
    console.log(response)
    yield put(action.fetchSuccess())
    yield put(action.postSignUpSuccess())
    yield put(replace('/account'))
  } catch (error) {
    yield put(action.fetchFailed())
    console.log(error)
    yield put(action.postSignUpFailed(error))
  }
}

function* postLoginWorker(payload) {
  try {
    yield put(action.fetchRequest())
    // yield delay(5000)
    const response = yield call(user.logIn, payload)
    console.log(response)
    yield put(action.fetchSuccess())
    yield put(action.postLoginSuccess())
    yield put(replace('/account'))
  } catch (error) {
    console.log(error)
    yield put(action.fetchFailed())
    yield put(action.postLoginFailed(error))
  }
}

function* postLogoutWorker() {
  try {
    yield put(replace('/home'))
  } catch (error) {}
}

function* watchLogin() {
  while (true) {
    const { payload } = yield take(POST_LOGIN_REQUEST)
    yield fork(postLoginWorker, payload)
  }
}

function* watchSignUp() {
  while (true) {
    const { payload } = yield take(POST_SIGNUP_REQUEST)
    yield fork(postSignUpWorker, payload)
  }
}

function* watchLogout() {
  while (true) {
    yield take(POST_LOGOUT_REQUEST)
    yield fork(postLogoutWorker)
  }
}

export { watchSignUp, watchLogin, watchLogout }
