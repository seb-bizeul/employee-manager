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

export default function EmployeePage(props: Props) {
  return (
    <div className='EmployeePage'>
      <div className='EmployeePage-topBar'>
        <div className='EmployeePage-topBar--search'></div>
        <div>
          <button
            className='EmployeePage-topBar--button'
            onClick={props.employeeCreate}
          >
            + Create new Employee
          </button>
          <button
            className='EmployeePage-topBar--button'
            onClick={props.sendInvitations}
          >
            Send Invitations
          </button>
        </div>
      </div>
      {props.errors.length ? renderErrorMessage() : null}
      <EmployeeTable employees={props.employees} select={props.select} remove={props.remove}/>
    </div>
  )
}
