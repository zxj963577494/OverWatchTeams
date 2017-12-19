import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { getAppRoutes } from '../../routes'
//import DevTools from '../DevTools/DevTools'

class Root extends Component {
  render() {
    const { store } = this.props
    const history = store.history
    return (
      <Provider store={store}>
        {getAppRoutes(history)}
        {/* <DevTools /> */}
      </Provider>
    )
  }
}

export default Root
