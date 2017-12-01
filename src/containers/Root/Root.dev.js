import React, { Component } from 'react'
import { Provider } from 'react-redux'
import getRoutes from '../../routes'
//import DevTools from '../DevTools/DevTools'

class Root extends Component {
  render() {
    const { store } = this.props
    const history = store.history
    return (
      <Provider store={store}>
        {getRoutes(history)}
        {/* <DevTools /> */}
      </Provider>
    )
  }
}

export default Root
