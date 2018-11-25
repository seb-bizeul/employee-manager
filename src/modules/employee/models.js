// @flow
import uuid from 'uuid/v4'

import type { Employee } from './types'


export const toMap = (employees: Employee[]) => {
  return employees.reduce((acc, employee) => {
    acc[employee.id] = employee
    return acc
  }, {})
}

export const createEmployee = (employee: $Diff<Employee, { id: string }>): Employee => ({
  id: uuid(),
  ...employee
})

export const isNotValid = (employee: Employee) => {
  return !employee.email_address.match(/\S+@\S+\.\S+/)
}
