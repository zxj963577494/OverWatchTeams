import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { Toast } from 'antd-mobile'
import { goBack, replace } from 'react-router-redux'
import {
  GET_HOME_RECRUIT_ORDER_LIST_REQUEST,
  GET_ACCOUNT_RECRUIT_ORDER_LIST_REQUEST,
  GET_RECRUIT_ORDER_DETAIL_REQUEST,
  POST_RECRUIT_ORDER_REQUEST,
  DELETE_RECRUIT_ORDER_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { recruitOrder } from '../services/leanclound'

function* postRecruitOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(recruitOrder.cerateRecruitOrder, payload)
    yield put(action.postRecruitOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield replace('/account/recruitorders')
  } catch (error) {
    yield put(action.postRecruitOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* getAccountRecruitOrderListWorker(payload) {
  try {
    const response = yield call(
      recruitOrder.getAccountRecruitOrderList,
      payload
    )
    yield put(action.getAccountRecruitOrderListSuccess(response))
  } catch (error) {
    yield put(action.getAccountRecruitOrderListFailed(error))
  }
}

function* getHomeRecruitOrderListWorker(payload) {
  try {
    const response = yield call(
      recruitOrder.getHomeRecruitOrderList,
      payload
    )
    yield put(action.getHomeRecruitOrderListSuccess(response))
  } catch (error) {
    yield put(action.getHomeRecruitOrderListFailed(error))
  }
}

function* watchPostRecruitOrder() {
  while (true) {
    const { payload } = yield take(POST_RECRUIT_ORDER_REQUEST)
    yield fork(postRecruitOrderWorker, payload)
  }
}

function* watchGetAccountRecruitOrderList() {
  while (true) {
    const { payload } = yield take(GET_ACCOUNT_RECRUIT_ORDER_LIST_REQUEST)
    yield fork(getAccountRecruitOrderListWorker, payload)
  }
}

function* watchGetHomeRecruitOrderList() {
  while (true) {
    const { payload } = yield take(GET_HOME_RECRUIT_ORDER_LIST_REQUEST)
    yield fork(getHomeRecruitOrderListWorker, payload)
  }
}

export { watchGetHomeRecruitOrderList, watchPostRecruitOrder, watchGetAccountRecruitOrderList }
