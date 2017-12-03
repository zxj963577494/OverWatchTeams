import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { Toast } from 'antd-mobile'
import {
  POST_SIGNUP_REQUEST,
  POST_LOGIN_REQUEST,
  POST_LOGOUT_REQUEST,
  PUT_USERINFO_REQUEST,
  GET_USERINFO_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* postSignUpWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
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
    yield put(action.fetchRequest({ text: '加载中' }))
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
    yield put(action.fetchRequest({ text: '注销中' }))
    yield delay(1000)
    yield call(user.logOut)
    yield put(action.fetchSuccess())
    yield put(replace('/home'))
  } catch (error) {
    yield put(action.fetchFailed())
  }
}

function* putUserInfoWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(user.putUserInfo, payload)
    console.log(response)
    yield put(action.fetchSuccess())
    yield put(action.putUserInfoSuccess(response.attributes))
    Toast.success('提交成功', 1.5)
  } catch (error) {
    console.log(error)
    yield put(action.fetchFailed())
    yield put(action.putUserInfoFailed(error))
    Toast.fail('提交失败', 1.5)
  }
}

function* getUserInfoWorker() {
  try {
    const response = yield call(user.getUserInfo)
    yield put(
      action.getUserInfoSuccess(response)
    )
  } catch (error) {
    yield put(action.getUserInfoFailed(error))
  }
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

function* watchPutUserInfo() {
  while (true) {
    const { payload } = yield take(PUT_USERINFO_REQUEST)
    yield fork(putUserInfoWorker, payload)
  }
}

function* watchGetUserInfo() {
  while (true) {
    yield take(GET_USERINFO_REQUEST)
    yield fork(getUserInfoWorker)
  }
}

export {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchGetUserInfo,
  watchPutUserInfo
}
