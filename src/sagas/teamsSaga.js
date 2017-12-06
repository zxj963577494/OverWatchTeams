import { put, fork, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { replace } from 'react-router-redux'
import { Toast } from 'antd-mobile'
import {
  POST_TEAMS_REQUEST,
  PUT_TEAMS_REQUEST,
  GET_USER_TEAMS_REQUEST,
  DELETE_TEAM_MEMBER_REQUEST,
  DELETE_TEAM_REQUEST,
  GET_HOME_TEAM_LIST_REQUEST,
  GET_HOME_TEAM_DETAIL_REQUEST
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

function* getTeamsByUserWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '加载中' }))
    const teams1 = yield call(teams.getTeamsByUser, payload)
    const teams2 = yield call(teams.getUsersByTeam, teams1)
    yield put(action.getTeamsByUserSuccess(teams2))
    yield put(action.fetchSuccess())
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.getTeamsByUserFailed(error))
  }
}

function* deleteTeamMemberWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(teams.removeMember, payload)
    yield put(action.deleteTeamMemberSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('移除队员成功', 1.5)
    yield delay(1500)
    yield put(replace('/account/teams'))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.deleteTeamMemberFailed(error))
    Toast.fail(error.message, 1.5)
  }
}

function* deleteTeamWorker(payload) {
  try {
    yield put(action.fetchRequest({ text: '提交中' }))
    const response = yield call(teams.removeTeam, payload)
    yield put(action.deleteTeamSuccess(response))
    yield put(action.fetchSuccess())
    Toast.success('移除队员成功', 1.5)
    yield delay(1500)
    yield put(replace('/account/teams'))
  } catch (error) {
    yield put(action.fetchFailed())
    yield put(action.deleteTeamFailed(error))
    Toast.fail(error.message, 1.5)
  }
}

function* getHomeTeamListWorker(payload) {
  try {
    const response = yield call(teams.getHomeTeamsList, payload)
    yield put(action.getHomeTeamListSuccess(response))
  } catch (error) {
    yield put(action.getHomeTeamListFailed(error))
  }
}

function* getHomeTeamDetailWorker(payload) {
  try {
    const response = yield call(teams.getHomeTeamsDetail, payload)
    yield put(action.getHomeMemberDetailSuccess(response))
  } catch (error) {
    yield put(action.getHomeMemberDetailFailed(error))
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
    const { payload } = yield take(GET_USER_TEAMS_REQUEST)
    yield fork(getTeamsByUserWorker, payload)
  }
}

function* watchDeleteTeamMember() {
  while (true) {
    const { payload } = yield take(DELETE_TEAM_MEMBER_REQUEST)
    yield fork(deleteTeamMemberWorker, payload)
  }
}

function* watchDeleteTeam() {
  while (true) {
    const { payload } = yield take(DELETE_TEAM_REQUEST)
    yield fork(deleteTeamWorker, payload)
  }
}

function* watchGetHomeTeamList() {
  while (true) {
    const { payload } = yield take(GET_HOME_TEAM_LIST_REQUEST)
    yield fork(getHomeTeamListWorker, payload)
  }
}

function* watchGetHomeTeamDetail() {
  while (true) {
    const { payload } = yield take(GET_HOME_TEAM_DETAIL_REQUEST)
    yield fork(getHomeTeamDetailWorker, payload)
  }
}

export {
  watchGetTeamsByUser,
  watchPostTeams,
  watchPutTeams,
  watchDeleteTeamMember,
  watchDeleteTeam,
  watchGetHomeTeamList,
  watchGetHomeTeamDetail
}
