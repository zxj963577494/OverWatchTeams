import { fork, take, call } from 'redux-saga/effects'
import { POST_PAGECOUNT_REQUEST } from '../constants/actionTypes'
import { postViewCount } from '../services/api'

function* postPageCountWorker(payload) {
  yield call(postViewCount, payload)
}

function* watchPageCount() {
  while (true) {
    const { payload } = yield take(POST_PAGECOUNT_REQUEST)
    yield fork(postPageCountWorker, payload)
  }
}

export { watchPageCount }
