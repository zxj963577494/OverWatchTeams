import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { Toast } from 'antd-mobile'
import { replace } from 'react-router-redux'
import {
  GET_HOME_RESUME_ORDER_LIST_REQUEST,
  GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST,
  POST_RESUME_ORDER_REQUEST,
  PUT_RESUME_ORDER_REQUEST,
  DELETE_RESUME_ORDER_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { resumeOrder } from '../services/leanclound'

function* postResumeOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(resumeOrder.cerateResumeOrder, payload)
    yield put(action.postResumeOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(replace('/account/resumeorders'))
  } catch (error) {
    yield put(action.postResumeOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* putResumeOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(resumeOrder.updateResumeOrder, payload)
    yield put(action.putResumeOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(replace('/account/resumeorders'))
  } catch (error) {
    yield put(action.putResumeOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('提交失败', 1)
  }
}

function* deleteResumeOrderWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(resumeOrder.removeResumeOrder, payload)
    yield put(action.deleteResumeOrderSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('删除成功', 1)
  } catch (error) {
    yield put(action.deleteResumeOrderFailed(error))
    yield put(action.fetchFailed())
    Toast.success('删除失败', 1)
  }
}

function* getAccountResumeOrderListWorker(payload) {
  try {
    const response = yield call(
      resumeOrder.getAccountResumeOrderList,
      payload
    )
    yield put(action.getAccountResumeOrderListSuccess(response))
  } catch (error) {
    yield put(action.getAccountResumeOrderListFailed(error))
  }
}

function* getHomeResumeOrderListWorker(payload) {
  try {
    const response = yield call(resumeOrder.getHomeResumeOrderList, payload)
    yield put(action.getHomeResumeOrderListSuccess(response))
  } catch (error) {
    yield put(action.getHomeResumeOrderListFailed(error))
  }
}

function* watchPostResumeOrder() {
  while (true) {
    const { payload } = yield take(POST_RESUME_ORDER_REQUEST)
    yield fork(postResumeOrderWorker, payload)
  }
}

function* watchGetAccountResumeOrderList() {
  while (true) {
    const { payload } = yield take(GET_ACCOUNT_RESUME_ORDER_LIST_REQUEST)
    yield fork(getAccountResumeOrderListWorker, payload)
  }
}

function* watchGetHomeResumeOrderList() {
  while (true) {
    const { payload } = yield take(GET_HOME_RESUME_ORDER_LIST_REQUEST)
    yield fork(getHomeResumeOrderListWorker, payload)
  }
}

function* watchPutResumeOrder() {
  while (true) {
    const { payload } = yield take(PUT_RESUME_ORDER_REQUEST)
    yield fork(putResumeOrderWorker, payload)
  }
}

function* watchDeleteResumeOrder() {
  while (true) {
    const { payload } = yield take(DELETE_RESUME_ORDER_REQUEST)
    yield fork(deleteResumeOrderWorker, payload)
  }
}

export {
  watchGetHomeResumeOrderList,
  watchPostResumeOrder,
  watchGetAccountResumeOrderList,
  watchPutResumeOrder,
  watchDeleteResumeOrder
}
