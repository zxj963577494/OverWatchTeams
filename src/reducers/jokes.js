import {
  GET_JOKES_REQUEST,
  GET_JOKES_SUCCESS,
  GET_JOKES_FAILED,
} from '../constants/actionTypes'

const initialJokesState = {
  list: [],
  isFetching: false,
  isLoadMore: false,
  isRefreshing: false,
  page: 1,
  pre_page: 10
}

function jokesReducer(state = initialJokesState, action) {
  switch (action.type) {
    case GET_JOKES_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRefreshing: action.payload.isRefreshing,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_JOKES_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isFetching: false,
        isRefreshing: false,
        isLoadMore: action.payload.length < 10 ? true : false
      }
    case GET_JOKES_FAILED:
      return { ...state, isFetching: false, isRefreshing: false }
    default:
      return state
  }
}

export { jokesReducer }
