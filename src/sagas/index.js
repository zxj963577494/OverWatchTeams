import { fork, all } from 'redux-saga/effects'
import { watchArticles, watchStickyArticles } from './articlesSaga'
import {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchPutUserInfo,
  watchGetUserInfo
} from './userSaga'
import {
  watchPostTeams,
  watchPutTeams,
  watchDeleteTeamMember,
  watchDeleteTeam,
  watchGetHomeTeamList,
  watchGetHomeTeamDetail,
  watchGetMyTeams,
  watchGetInTeams
} from './teamsSaga'
import { watchUpload } from './commonSaga'
import { watchGetHomeUserList, watchGetHomeUserDetail } from './userSaga'
import {
  watchGetAccountRecruitOrderList,
  watchGetHomeRecruitOrderList,
  watchPostRecruitOrder
} from './recruitOrderSaga'

export default function* rootSaga() {
  yield all([
    fork(watchArticles),
    fork(watchStickyArticles),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
    fork(watchUpload),
    fork(watchPutUserInfo),
    fork(watchGetUserInfo),
    fork(watchPostTeams),
    fork(watchPutTeams),
    fork(watchDeleteTeamMember),
    fork(watchDeleteTeam),
    fork(watchGetHomeUserList),
    fork(watchGetHomeUserDetail),
    fork(watchGetHomeTeamList),
    fork(watchGetHomeTeamDetail),
    fork(watchGetMyTeams),
    fork(watchGetInTeams),
    fork(watchGetAccountRecruitOrderList),
    fork(watchGetHomeRecruitOrderList),
    fork(watchPostRecruitOrder)
  ])
}
