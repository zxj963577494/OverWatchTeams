import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { Toast } from 'antd-mobile'
import {
  POST_TEAMS_REQUEST,
  PUT_TEAMS_REQUEST,
  GET_USER_TEAMS_REQUEST
} from '../constants/actionTypes'
import * as action from '../actions'
import { teams } from '../services/leanclound'

function* postTeamsWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    yield call(teams.cerateTeam, payload)
    yield put(action.fetchSuccess())
    yield put(action.postTeamsSuccess())
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(replace('/account/teams'))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.postTeamsFailed())
    Toast.fail('提交失败', 1)
  }
}

function* putTeamsWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(teams.updateTeams, payload)
    console.log(response)
    yield put(action.fetchSuccess())
    yield put(action.putTeamsSuccess())
    Toast.success('提交成功', 1)
    yield delay(1000)
    yield put(replace('/account/teams'))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.putTeamsFailed())
    Toast.fail('提交失败', 1)
  }
}

function* getTeamsByUserWorker() {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const teams1 = yield call(teams.getTeamsByUser)
    const teams2 = yield call(teams.getUsersByTeam, teams1)
    yield put(action.getTeamsByUserSuccess(teams2))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.getTeamsByUserFailed(error))
  }
}

function* watchPostTeams() {
  while (true) {
    const { payload } = yield take(POST_TEAMS_REQUEST)
    yield fork(postTeamsWorker, payload)
  }
}

function* watchPutTeams() {
  while (true) {
    const { payload } = yield take(PUT_TEAMS_REQUEST)
    yield fork(putTeamsWorker, payload)
  }
}

function* watchGetTeamsByUser() {
  while (true) {
    yield take(GET_USER_TEAMS_REQUEST)
    yield fork(getTeamsByUserWorker)
  }
}

export { watchGetTeamsByUser, watchPostTeams, watchPutTeams }
