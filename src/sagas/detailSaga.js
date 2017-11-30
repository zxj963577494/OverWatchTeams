import { put, fork, take, call } from 'redux-saga/effects'
import { GET_DETAIL_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { getDetail } from '../services/api'

function* getDetailWorker(payload) {
  try {
    yield put(action.setNavBar({ title: '奇葩林', isCanBack: true }))
    const response = yield call(getDetail, payload)
    yield put(action.getDetailSuccess(response.data))
  } catch (error) {
    yield put(action.getDetailSuccess(error))
  }
}

function* watchDetail() {
  while (true) {
    const { payload } = yield take(GET_DETAIL_REQUEST)
    yield fork(getDetailWorker, payload)
  }
}

export { watchDetail }
