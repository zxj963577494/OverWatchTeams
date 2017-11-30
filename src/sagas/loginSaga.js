import { put, fork, take, call } from 'redux-saga/effects'
import Cookies from 'universal-cookie'
import { replace } from 'react-router-redux'
import { POST_LOGIN_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { postLogin } from '../services/api'

function* postLoginWorker(payload) {
  try {
    yield put(action.setNavBar({ title: '奇葩林', isCanBack: false }))
    const response = yield call(postLogin, payload)
    yield put(action.postLoginSuccess(response.data))
    yield fork(setCookies, response.data.token)
    yield put(replace('/account'))
  } catch (error) {
    yield put(action.postLoginFailed(error))
  }
}

function setCookies(token) {
  const cookies = new Cookies()
  cookies.set('token', token)
}

function* watchLogin() {
  while (true) {
    const { payload } = yield take(POST_LOGIN_REQUEST)
    yield fork(postLoginWorker, payload)
  }
}

export { watchLogin }
