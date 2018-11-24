// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import RoutingContainer from '../containers/RoutingContainer'
import './App.css'


const store = configureStore()

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <RoutingContainer/>
        </div>
      </Provider>
    )
  }
}

export default App
