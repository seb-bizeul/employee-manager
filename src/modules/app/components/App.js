import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import './App.css'


const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          It Works !
        </div>
      </Provider>
    )
  }
}

export default App
