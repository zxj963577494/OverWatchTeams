import {
  GET_HOME_MEMBER_LIST_REQUEST,
  GET_HOME_MEMBER_LIST_SUCCESS,
  GET_HOME_MEMBER_LIST_FAILED
} from '../constants/actionTypes'

const initialMembersState = {
  list: [],
  isLoadMore: false,
  isRefreshing: false,
  page: 1,
  pagesize: 20
}

function membersReducer(state = initialMembersState, action) {
  switch (action.type) {
    case GET_HOME_MEMBER_LIST_REQUEST:
      return {
        ...state,
        isRefreshing: action.payload.isRefreshing || false,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_HOME_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isRefreshing: false,
        isLoadMore: action.payload.length < 20 ? false : true
      }
    case GET_HOME_MEMBER_LIST_FAILED:
      return { ...state, isRefreshing: false }
    default:
      return state
  }
}

export { membersReducer }
