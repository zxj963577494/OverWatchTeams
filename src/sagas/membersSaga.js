import { put, fork, take, call } from 'redux-saga/effects'
import {
  GET_HOME_MEMBER_LIST_REQUEST,
  GET_HOME_MEMBER_DETAIL_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { user } from '../services/leanclound'

function* getHomeMemberListWorker(payload) {
  try {
    const response = yield call(user.getHomeMemberList, payload)
    yield put(action.getHomeMemberListSuccess(response))
  } catch (error) {
    yield put(action.getHomeMemberListFailed(error))
  }
}

function* getHomeMemberDetailWorker(payload) {
  try {
    yield put(action.fetchRequest({text: '加载中'}))
    const response = yield call(user.getHomeMemberDetail, payload)
    yield put(action.getHomeMemberDetailSuccess(response))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.getHomeMemberDetailFailed(error))
    yield put(action.fetchFailed())
  }
}

function* watchGetHomeMemberList() {
  while (true) {
    const { payload } = yield take(GET_HOME_MEMBER_LIST_REQUEST)
    yield fork(getHomeMemberListWorker, payload)
  }
}

function* watchGetHomeMemberDetail() {
  while (true) {
    const { payload } = yield take(GET_HOME_MEMBER_DETAIL_REQUEST)
    yield fork(getHomeMemberDetailWorker, payload)
  }
}

export { watchGetHomeMemberList, watchGetHomeMemberDetail }
