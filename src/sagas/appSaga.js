import { put, fork, take, call } from 'redux-saga/effects'
import { GET_MEMBER_DETAIL_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* getMemberDetailWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const response = yield call(user.getMemberInfo, payload)
    yield put(action.fetchSuccess())
    yield put(action.getMemberDetailSuccess(response))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.getMemberDetailFailed(error))
  }
}

function* watchGetMemberDetail() {
  while (true) {
    const { payload } = yield take(GET_MEMBER_DETAIL_REQUEST)
    yield fork(getMemberDetailWorker, payload)
  }
}

export { watchGetMemberDetail }
