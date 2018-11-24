import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import csv from '../../csv'
import './App.css'


const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <csv.components.CsvUploadContainer/>
        </div>
      </Provider>
    )
  }
}

export default App
