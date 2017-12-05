import {
  GET_HOME_MEMBER_LIST_REQUEST,
  GET_HOME_MEMBER_LIST_SUCCESS,
  GET_HOME_MEMBER_LIST_FAILED
} from '../constants/actionTypes'

const initialMembersState = {
  list: [],
  isFetching: false,
  isLoadMore: false,
  isRefreshing: false,
  page: 1,
  pre_page: 10
}

function membersReducer(state = initialMembersState, action) {
  switch (action.type) {
    case GET_HOME_MEMBER_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRefreshing: action.payload.isRefreshing,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_HOME_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isFetching: false,
        isRefreshing: false,
        isLoadMore: action.payload.length < 10 ? true : false
      }
    case GET_HOME_MEMBER_LIST_FAILED:
      return { ...state, isFetching: false, isRefreshing: false }
    default:
      return state
  }
}

export { membersReducer }
