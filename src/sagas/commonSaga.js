import { put, fork, take, call } from 'redux-saga/effects'
import {
  POST_UPLOAD_REQUEST,
} from '../constants/actionTypes'
import * as action from '../actions'
import { common } from '../services/leanclound'

function* postUploadWorker(payload) {
  try {
    yield put(action.fetchRequest({text: '上传中'}))
    const response = yield call(common.uploadPic, payload)
    console.log(response)
    yield put(action.postUploadSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.postUploadFailed(error))
    yield put(action.fetchFailed())
  }
}

function* watchUpload() {
  while (true) {
    const { payload } = yield take(POST_UPLOAD_REQUEST)
    yield fork(postUploadWorker, payload)
  }
}

export { watchUpload }
