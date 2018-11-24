// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
import csv from '../../csv'
import employee from '../../employee'
import './App.css'


const store = configureStore()

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <csv.components.CsvUploadContainer/>
          <employee.components.EmployeesContainer/>
        </div>
      </Provider>
    )
  }
}

export default App
