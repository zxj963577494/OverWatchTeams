import React from 'react'
import ReactDOM from 'react-dom'
import AV from 'leancloud-storage'
import { Root } from './containers'
import rootSaga from './sagas'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'

const appId = '请填入appId'
const appKey = '请填入appKey'
AV.init({ appId, appKey })

const store = configureStore({})

store.runSaga(rootSaga)

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
