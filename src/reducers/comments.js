
import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILED,
} from '../constants/actionTypes'

const initialCommentsState = {
  list: [],
  isFetching: false,
  isLoadMore: false,
  page: 1,
}

function commentsReducer(state = initialCommentsState, action) {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isFetching: false,
        isLoadMore: action.payload.length < 10 ? true : false
      }
    case GET_COMMENTS_FAILED:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

export { commentsReducer }
