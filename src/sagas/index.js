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
  watchGetTeamsByUser,
  watchPostTeams,
  watchPutTeams,
  watchDeleteTeamMember,
  watchDeleteTeam,
  watchGetHomeTeamList,
  watchGetHomeTeamDetail
} from './teamsSaga'
import { watchUpload } from './commonSaga'
import { watchGetHomeMemberList, watchGetHomeMemberDetail } from './membersSaga'

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
    fork(watchGetTeamsByUser),
    fork(watchDeleteTeamMember),
    fork(watchDeleteTeam),
    fork(watchGetHomeMemberList),
    fork(watchGetHomeMemberDetail),
    fork(watchGetHomeTeamList),
    fork(watchGetHomeTeamDetail)
  ])
}
