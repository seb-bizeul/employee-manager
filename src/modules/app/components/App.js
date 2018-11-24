// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import RoutingContainer from '../containers/RoutingContainer'
import Navbar from './Navbar'
import './App.css'


const store = configureStore()

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Navbar/>
          <div className='App-content'>
            <RoutingContainer/>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
