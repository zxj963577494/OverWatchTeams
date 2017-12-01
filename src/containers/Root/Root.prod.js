import React, { Component } from 'react'
import { Provider } from 'react-redux'
import getRoutes from '../../routes'

class Root extends Component {
  render() {
    const { store } = this.props
    const history = store.history
    return (
      <Provider store={store}>
        {getRoutes(history)}
      </Provider>
    )
  }
}

export default Root
