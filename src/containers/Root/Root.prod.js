import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { getAppRoutes } from '../../routes'

class Root extends Component {
  render() {
    const { store } = this.props
    const history = store.history
    return (
      <Provider store={store}>
        {getAppRoutes(history)}
      </Provider>
    )
  }
}

export default Root
