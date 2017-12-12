import { put, fork, take, call } from 'redux-saga/effects'
import {
  POST_UPLOAD_REQUEST,
  SEND_EMAIL_REQUEST,
  SEND_PASSWORD_RESET_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { common } from '../services/leanclound'

function* postUploadWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '上传中' }))
    const response = yield call(common.uploadPic, payload)
    console.log(response)
    yield put(action.postUploadSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.postUploadFailed(error))
    yield put(action.fetchFailed())
  }
}

function* sendEmailWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(common.requestEmailVerify, payload)
    yield put(action.sendEmailSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.sendEmailFailed(error))
    yield put(action.fetchFailed())
  }
}

function* sendPasswordResetWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(common.requestPasswordReset, payload)
    yield put(action.sendEmailSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.sendEmailFailed(error))
    yield put(action.fetchFailed())
  }
}

function* watchUpload() {
  while (true) {
    const { payload } = yield take(POST_UPLOAD_REQUEST)
    yield fork(postUploadWorker, payload)
  }
}

function* watchSendEmail() {
  while (true) {
    const { payload } = yield take(SEND_EMAIL_REQUEST)
    yield fork(sendEmailWorker, payload)
  }
}

function* watchSendPasswordReset() {
  while (true) {
    const { payload } = yield take(SEND_PASSWORD_RESET_REQUEST)
    yield fork(sendPasswordResetWorker, payload)
  }
}

export { watchUpload, watchSendEmail, watchSendPasswordReset }
