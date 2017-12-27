import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { getAppRoutes } from '../../routes'

class Root extends Component {
  render() {
    const { store, persistor } = this.props
    const history = store.history
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>{getAppRoutes(history)}</PersistGate>
      </Provider>
    )
  }
}

export default Root
