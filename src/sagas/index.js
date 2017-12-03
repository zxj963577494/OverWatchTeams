import { fork, all } from 'redux-saga/effects'
import { watchArticles, watchStickyArticles } from './articlesSaga'
import {
  watchSignUp,
  watchLogin,
  watchLogout,
  watchPutUserInfo,
  watchGetUserInfo
} from './userSaga'
import { watchGetTeamsByUser, watchPostTeams } from './teamsSaga'
import { watchUpload } from './commonSaga'

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
    fork(watchGetTeamsByUser)
  ])
}
