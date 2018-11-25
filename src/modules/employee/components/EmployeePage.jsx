// @flow
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'redux-first-router-link'

import EmployeeTable from './EmployeeTable'
import * as employeeActions from '../actions'
import location from '../../location'
import type { Employee } from '../types'
import type { CsvError } from '../../csv/types'
import './EmployeePage.css'


type Props = $ReadOnly<{|
  employees: Employee[],
  errors: CsvError[],
  employeeCreate: typeof location.actions.employeeCreate,
  sendInvitations: typeof employeeActions.sendInvitations,
  select: typeof employeeActions.select,
  remove: typeof employeeActions.remove
|}>

const renderErrorMessage = () => {
  return (
    <div className='EmployeePage-errMessage'>
      <div className='EmployeePage-errMessage--msg'>
        <FaExclamationTriangle/> Errors detected
      </div>
      <Link
        to={location.actions.goToReport()}
        className='EmployeePage-errMessage--link'
      >
        Click here to see full report
      </Link>
    </div>
  )
}

type State = {|
  search: string
|}

export default class EmployeePage extends React.Component<Props, State> {

  state = {
    search: ''
  }

  handleChangeSearch = (e: { target: HTMLInputElement }) => {
    this.setState({ search: e.target.value })
  }

  byName = (employee: Employee) => {
    return (
      employee.first_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
      employee.last_name.toUpperCase().includes(this.state.search.toUpperCase())
    )
  }

  render() {
    return (
      <div className='EmployeePage'>
        <div className='EmployeePage-topBar'>
            <input
              className='EmployeePage-topBar--search'
              type='text'
              value={this.state.search}
              onChange={this.handleChangeSearch}
              placeholder='Search...'
            />
          <div>
            <button
              className='EmployeePage-topBar--button'
              onClick={this.props.employeeCreate}
            >
              + Create new Employee
            </button>
            <button
              className='EmployeePage-topBar--button'
              onClick={this.props.sendInvitations}
            >
              + Send Invitations
            </button>
          </div>
        </div>
        {this.props.errors.length ? renderErrorMessage() : null}
        <EmployeeTable
          employees={this.props.employees.filter(this.byName)}
          select={this.props.select}
          remove={this.props.remove}
        />
      </div>
    )
  }
}
