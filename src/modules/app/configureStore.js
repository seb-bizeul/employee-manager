// @flow strict
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootSaga from './saga'
import rootReducer from './reducer'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware
]

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}
