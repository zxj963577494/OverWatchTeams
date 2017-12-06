import { put, fork, take, call } from 'redux-saga/effects'
import { GET_HOME_MEMBER_LIST_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* getMemberListWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const response = yield call(user.getHomeMembers, payload)
    yield put(action.getHomeMemberListSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.getHomeMemberListFailed(error))
    yield put(action.fetchFailed())
  }
}

function* watchGetMemberList() {
  while (true) {
    const { payload } = yield take(GET_HOME_MEMBER_LIST_REQUEST)
    yield fork(getMemberListWorker, payload)
  }
}

export { watchGetMemberList }
