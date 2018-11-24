// @flow
import React from 'react'

import csv from '../../csv'
import employee from '../../employee'
import location from '../../location'


type Props = $ReadOnly<{|
  actionType: string
|}>

const matchActionType = (type: string) => {
  switch (type) {
  case location.actions.CSV: return <csv.components.CsvUploadContainer/>
  case location.actions.EMPLOYEE: return <employee.components.EmployeePageContainer/>
  case location.actions.EMPLOYEE_EDIT: return <employee.components.EmployeeFormContainer/>
  default: return null
  }
}

export default function Routing(props: Props) {
  return matchActionType(props.actionType)
}
