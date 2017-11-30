import { put, fork, take, call } from 'redux-saga/effects'
import { GET_JOKES_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { getJokes } from '../services/api'

function* getJokesWorker(payload) {
  try {
    yield put(action.setNavBar({ title: '奇葩林', isCanBack: false }))
    const response = yield call(getJokes, payload)
    yield put(action.getJokesSuccess(response.data))
  } catch (error) {
    yield put(action.getJokesSuccess(error))
  }
}

function* watchJokes() {
  while (true) {
    const { payload } = yield take(GET_JOKES_REQUEST)
    yield fork(getJokesWorker, payload)
  }
}

export { watchJokes }
