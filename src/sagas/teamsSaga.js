import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { Toast } from 'antd-mobile'
import {
  POST_TEAMS_REQUEST,
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

function* getTeamsByUserWorker() {
  try {
    const response = yield call(teams.getTeamsByUser)
    console.log(response[0])
    yield put(
      action.getTeamsByUserSuccess({
        ...response[0].attributes.userinfo.attributes,
        objectId: response[0].attributes.userinfo.id
      })
    )
  } catch (error) {
    yield put(action.getTeamsByUserFailed(error))
  }
}

function* watchPostTeams() {
  while (true) {
    const { payload } = yield take(POST_TEAMS_REQUEST)
    yield fork(postTeamsWorker, payload)
  }
}

function* watchGetTeamsByUser() {
  while (true) {
    yield take(GET_USER_TEAMS_REQUEST)
    yield fork(getTeamsByUserWorker)
  }
}

export { watchGetTeamsByUser, watchPostTeams }
