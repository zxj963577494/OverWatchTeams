import {
  GET_HOME_MEMBER_LIST_REQUEST,
  GET_HOME_MEMBER_LIST_SUCCESS,
  GET_HOME_MEMBER_LIST_FAILED,
  GET_HOME_MEMBER_DETAIL_REQUEST,
  GET_HOME_MEMBER_DETAIL_SUCCESS,
  GET_HOME_MEMBER_DETAIL_FAILED
} from '../../constants/actionTypes'

const initialMembersState = {
  list: [],
  current: {},
  isFetching: false,
  fetchingText: '加载中',
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
        isFetching: true,
        isRefreshing: action.payload.isRefreshing || false,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_HOME_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isFetching: false,
        isRefreshing: false,
        isLoadMore: action.payload.length < 20 ? false : true
      }
    case GET_HOME_MEMBER_LIST_FAILED:
      return { ...state, isFetching: false, isRefreshing: false }
    case GET_HOME_MEMBER_DETAIL_REQUEST:
      return { ...state, isFetching: true }
    case GET_HOME_MEMBER_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        current: action.payload
      }
    case GET_HOME_MEMBER_DETAIL_FAILED:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

export { membersReducer }
