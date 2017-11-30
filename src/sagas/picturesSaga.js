import { put, fork, take, call } from 'redux-saga/effects'
import { GET_PICTURES_REQUEST } from '../constants/actionTypes'
import * as action from '../actions'
import { getPictures } from '../services/api'

function* getPicturesWorker(payload) {
  try {
    yield put(action.setNavBar({ title: '奇葩林', isCanBack: false }))
    const response = yield call(getPictures, payload)
    yield put(action.getPicturesSuccess(response.data))
  } catch (error) {
    yield put(action.getPicturesSuccess(error))
  }
}

function* watchPictures() {
  while (true) {
    const { payload } = yield take(GET_PICTURES_REQUEST)
    yield fork(getPicturesWorker, payload)
  }
}

export { watchPictures }
