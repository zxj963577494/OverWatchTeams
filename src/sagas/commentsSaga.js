import { put, fork, take, call } from 'redux-saga/effects'
import { GET_COMMENTS_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { getComments } from '../services/api'

function* getCommentsWorker(payload) {
  try {
    const response = yield call(getComments, payload)
    yield put(action.getCommentsSuccess(response.data))
  } catch (error) {
    yield put(action.getCommentsSuccess(error))
  }
}

function* watchComments() {
  while (true) {
    const { payload } = yield take(GET_COMMENTS_REQUEST)
    yield fork(getCommentsWorker, payload)
  }
}

export { watchComments }
