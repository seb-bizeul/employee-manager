// @flow strict
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRoutes } from 'redux-first-router'

import rootSaga from './saga'
import reducers from './reducers'
import location from '../location'


const { reducer, middleware, enhancer } = connectRoutes(location.routesMap)

const sagaMiddleware = createSagaMiddleware()

const middlewares = applyMiddleware(...[
  sagaMiddleware,
  middleware
])

const enhancers = compose(enhancer, middlewares)

export default function configureStore() {
  const store = createStore(
    combineReducers({ location: reducer, ...reducers }),
    composeWithDevTools(enhancers)
  )
  sagaMiddleware.run(rootSaga)
  return store
}
