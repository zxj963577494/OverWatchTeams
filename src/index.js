import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './containers'
import rootSaga from './sagas'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore({})

store.runSaga(rootSaga)

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
)
registerServiceWorker()