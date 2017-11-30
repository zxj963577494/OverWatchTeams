import { put, fork, take, call } from 'redux-saga/effects'
import { replace } from 'react-router-redux'
import { POST_SIGNUP_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* postSignUpWorker(payload) {
  try {
    const response = yield call(user.signUp, payload)
    console.log(response)
    yield put(replace('/account'))
  } catch (error) {
    console.log(error)
    // yield put(action.postSignUpFailed(error))
  }
}

function* watchSignUp() {
  while (true) {
    const { payload } = yield take(POST_SIGNUP_REQUEST)
    yield fork(postSignUpWorker, payload)
  }
}

export { watchSignUp }
