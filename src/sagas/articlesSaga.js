import { put, fork, take, call } from 'redux-saga/effects'
import {
  GET_ARTICLES_REQUEST,
  GET_STICKY_ARTICLES_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { getArticles, getStickyArticles } from '../services/api'

function* getArticlesWorker(payload) {
  try {
    yield put(action.setNavBar({ title: '奇葩林', isCanBack: false }))
    const response = yield call(getArticles, payload)
    yield put(action.getArticlesSuccess(response.data))
  } catch (error) {
    yield put(action.getArticlesSuccess(error))
  }
}

function* getStickyArticlesWorker() {
  try {
    const response = yield call(getStickyArticles)
    yield put(action.getStickyArticlesSuccess(response.data))
  } catch (error) {
    yield put(action.getStickyArticlesFailed(error))
  }
}

function* watchStickyArticles() {
  while (true) {
    yield take(GET_STICKY_ARTICLES_REQUEST)
    yield fork(getStickyArticlesWorker)
  }
}

function* watchArticles() {
  while (true) {
    const { payload } = yield take(GET_ARTICLES_REQUEST)
    yield fork(getArticlesWorker, payload)
  }
}

export { watchArticles, watchStickyArticles }
