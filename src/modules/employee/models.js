// @flow
import uuid from 'uuid/v4'

import type { Employee, EmployeeTuple } from './types'


export const toMap = (employees: Employee[]) => {
  return employees.reduce((acc, employee) => {
    acc[employee.id] = employee
    return acc
  }, {})
}

export const createFromTuple = (tuple: EmployeeTuple): Employee => ({
  id: uuid(),
  first_name: tuple[0],
  last_name: tuple[1],
  gender: tuple[2],
  email: tuple[3],
  phone: tuple[4]
})

export const isNotValid = (employee: Employee) => {
  return !employee.email.match(/\S+@\S+\.\S+/)
}
