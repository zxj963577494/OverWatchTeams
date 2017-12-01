import {
  POST_UPLOAD_REQUEST,
  POST_UPLOAD_SUCCESS,
  POST_UPLOAD_FAILED
} from '../constants/actionTypes'

const initialCommonState = {
  file: ''
}

function commonReducer(state = initialCommonState, action) {
  switch (action.type) {
    case POST_UPLOAD_REQUEST:
      return state
    case POST_UPLOAD_SUCCESS:
      return { ...state, file: action.payload.attributes.url }
    case POST_UPLOAD_FAILED:
      return state
    default:
      return state
  }
}

export { commonReducer }
