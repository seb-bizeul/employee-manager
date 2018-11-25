// @flow
import React from 'react'
import { NOT_FOUND } from 'redux-first-router'

import csv from '../../csv'
import employee from '../../employee'
import location from '../../location'
import NotFound from './NotFound'


type Props = $ReadOnly<{|
  actionType: string
|}>

const matchActionType = (type: string) => {
  switch (type) {
  case location.actions.CSV: return <csv.components.CsvUploadContainer/>
  case location.actions.EMPLOYEE: return <employee.components.EmployeePageContainer/>
  case location.actions.EMPLOYEE_EDIT: return <employee.components.EmployeeFormContainer mode='edit'/>
  case location.actions.EMPLOYEE_CREATE: return <employee.components.EmployeeFormContainer mode='create'/>
  case NOT_FOUND: return <NotFound/>
  default: return null
  }
}

export default function Routing(props: Props) {
  return matchActionType(props.actionType)
}
