import {
  SET_NAVBAR,
} from '../constants/actionTypes'

const initialNavBarState = {
  title: 'OverWatch Teams',
  isCanBack: false,
}

function navbarReducer(state = initialNavBarState, action) {
  switch (action.type) {
    case SET_NAVBAR:
      return {
        ...state,
        title: action.payload.title,
        isCanBack: action.payload.isCanBack,
      }
    default:
      return state
  }
}

export default navbarReducer
