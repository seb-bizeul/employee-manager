// @flow
import uuid from 'uuid/v4'
import { pipe, maybe } from '@sbizeul/fp-flow'

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

export const isNotValid = (employee: Employee & { row: number }) => {
  return (
    !employee.email_address.match(/\S+@\S+\.\S+/) ||
    !employee.phone_number.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
  )
}

export const isEmailDuplicated = (employees: Employee[]) => (employee: Employee) => {
  return employees.find(e => {
    return (
      e.email_address === employee.email_address &&
      e.id !== employee.id
    )
  })
}

export const buildFormatError = (invalidEmployee: Employee & { row: number }) => ({
  row: invalidEmployee.row,
  code: 'invalid_field',
  message: 'Invalid email or phone',
  type: 'Format Error'
})

export const buildEmailDuplicationError = (invalidEmployee: Employee & { row: number }) => ({
  row: invalidEmployee.row,
  code: 'email_duplication',
  message: 'This email is duplicated',
  type: 'Email Duplication'
})

export const getFirstName = pipe(maybe.map(e => e.first_name), maybe.getOrElse(() => ''))

export const getLastName = pipe(maybe.map(e => e.last_name), maybe.getOrElse(() => ''))

export const getGender = pipe(maybe.map(e => e.gender), maybe.getOrElse(() => 'M'))

export const getEmailAddress = pipe(maybe.map(e => e.email_address), maybe.getOrElse(() => ''))

export const getPhoneNumber = pipe(maybe.map(e => e.phone_number), maybe.getOrElse(() => ''))
