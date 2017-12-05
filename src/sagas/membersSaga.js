import { put, fork, take, call } from 'redux-saga/effects'
import { GET_HOME_MEMBER_DETAIL_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* getMemberListWorker(payload) {
  try {
    const response = yield call(user.getMemberList, payload)
    yield put(action.getHomeMemberListSuccess(response))
  } catch (error) {
    yield put(action.getHomeMemberListFailed(error))
  }
}

function* watchGetMemberList() {
  while (true) {
    const { payload } = yield take(GET_HOME_MEMBER_DETAIL_REQUEST)
    yield fork(getMemberListWorker, payload)
  }
}

export { watchGetMemberList }
