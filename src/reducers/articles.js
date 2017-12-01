import {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILED,
  GET_STICKY_ARTICLES_REQUEST,
  GET_STICKY_ARTICLES_SUCCESS,
  GET_STICKY_ARTICLES_FAILED
} from '../constants/actionTypes'

const initialArticlesState = {
  list: [],
  isLoadMore: false,
  isRefreshing: false,
  page: 1,
  pre_page: 10
}

const initialStickyArticlesState = {
  list: [],
  isShowLogo: true,
  isFetching: false,
  default: {
    pic: require('../assets/images/logo.png'),
    title: '汇聚各种奇闻趣事的分享社区'
  }
}

function articlesReducer(state = initialArticlesState, action) {
  switch (action.type) {
    case GET_ARTICLES_REQUEST:
      return {
        ...state,
        isRefreshing: action.payload.isRefreshing,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        list: state.list.concat(action.payload),
        isRefreshing: false,
        isLoadMore: action.payload.length < 10 ? true : false
      }
    case GET_ARTICLES_FAILED:
      return { ...state, isRefreshing: false }
    default:
      return state
  }
}

function stickyArticlesReducer(state = initialStickyArticlesState, action) {
  switch (action.type) {
    case GET_STICKY_ARTICLES_REQUEST:
      return state
    case GET_STICKY_ARTICLES_SUCCESS:
      if (action.payload.length > 0) {
        return {
          ...state,
          list: state.list.slice(0, 1).concat(action.payload),
          isShowLogo: false
        }
      } else {
        return state
      }
    case GET_STICKY_ARTICLES_FAILED:
      return state
    default:
      return state
  }
}

export { articlesReducer, stickyArticlesReducer }
