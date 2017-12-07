import {
  PUT_USERINFO_REQUEST,
  PUT_USERINFO_SUCCESS,
  PUT_USERINFO_FAILED,
  GET_USERINFO_REQUEST,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILED
} from '../constants/actionTypes'
import { HEROS } from '../constants'

const initialUserInfoState = {
  objectId: '',
  nickname: '',
  position: 'DPS',
  contact: '',
  introduction: '',
  files: [],
  avatar: '',
  heros: HEROS,
  rank: 'top500',
  mouse: '',
  keyboard: '',
  headphones: '',
  pending: false
}

function userInfoReducer(state = initialUserInfoState, action) {
  switch (action.type) {
    case PUT_USERINFO_REQUEST:
      return { ...state, pending: true }
    case PUT_USERINFO_SUCCESS:
      return {
        ...state,
        pending: false
      }
    case PUT_USERINFO_FAILED:
      return { ...state, pending: false }
    case GET_USERINFO_REQUEST:
      return state
    case GET_USERINFO_SUCCESS:
      return {
        ...state,
        objectId: action.payload.objectId,
        nickname: action.payload.nickname,
        position: action.payload.position,
        contact: action.payload.contact,
        introduction: action.payload.introduction,
        avatar: action.payload.avatar,
        rank: action.payload.rank,
        rankscore: action.payload.rankscore,
        match: action.payload.match,
        mouse: action.payload.mouse,
        keyboard: action.payload.keyboard,
        headphones: action.payload.headphones,
        isPublic: action.payload.isPublic,
        heros: merge(HEROS, action.payload.heros)
      }
    case GET_USERINFO_FAILED:
      return state
    default:
      return state
  }
}

function merge(o1, o2) {
  if (o2) {
    const result = o1.map(item1 => {
      return Object.assign(
        item1,
        o2.find(item2 => {
          return item2 && item1.value === item2.value
        })
      )
    })
    return result
  }
}

export { userInfoReducer }
