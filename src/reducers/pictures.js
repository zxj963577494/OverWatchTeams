import {
  GET_PICTURES_REQUEST,
  GET_PICTURES_SUCCESS,
  GET_PICTURES_FAILED
} from '../constants/actionTypes'
import config from '../config'

const initialPicturesState = {
  list: [],
  isFetching: false,
  isLoadMore: false,
  isRefreshing: false,
  page: 1,
  pre_page: 10
}

function picturesReducer(state = initialPicturesState, action) {
  switch (action.type) {
    case GET_PICTURES_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRefreshing: action.payload.isRefreshing,
        page: action.payload.page ? action.payload.page : 1
      }
    case GET_PICTURES_SUCCESS:
      return {
        ...state,
        list: state.list.concat(
          action.payload.map(function(item) {
            // eslint-disable-next-line
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i
            var img = item.content.rendered.match(srcReg)[1]
            if (img) {
              if (img.indexOf('www.qipalin.com') > 0) {
                item.url =
                  config.DOMAIN +
                  '/wp-content/themes/begin/timthumb.php?src=' +
                  img
              } else {
                item.url = img + '?imageView2/0/w/200'
              }
            } else {
              item.url = '../../images/logo-128.jpg'
            }
            item.name = item.title.rendered
            return item
          })
        ),
        isFetching: false,
        isRefreshing: false,
        isLoadMore: action.payload.length < 10 ? true : false
      }
    case GET_PICTURES_FAILED:
      return { ...state, isFetching: false, isRefreshing: false }
    default:
      return state
  }
}

export { picturesReducer }
