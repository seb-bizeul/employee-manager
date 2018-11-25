// @flow
import React from 'react'

import EmployeeTable from './EmployeeTable'
import * as employeeActions from '../actions'
import location from '../../location'
import type { Employee } from '../types'
import './EmployeePage.css'


type Props = $ReadOnly<{|
  employees: Employee[],
  employeeCreate: typeof location.actions.employeeCreate,
  sendInvitations: typeof employeeActions.sendInvitations,
  select: typeof employeeActions.select,
  remove: typeof employeeActions.remove
|}>

export default function EmployeePage({ employees, employeeCreate, select, sendInvitations, remove }: Props) {
  return (
    <div className='EmployeePage'>
      <div className='EmployeePage-topBar'>
        <div className='EmployeePage-topBar--search'></div>
        <div>
          <button
            className='EmployeePage-topBar--button'
            onClick={employeeCreate}
          >
            + Create new Employee
          </button>
          <button
            className='EmployeePage-topBar--button'
            onClick={sendInvitations}
          >
            Send Invitations
          </button>
        </div>
      </div>
      <EmployeeTable employees={employees} select={select} remove={remove}/>
    </div>
  )
}
