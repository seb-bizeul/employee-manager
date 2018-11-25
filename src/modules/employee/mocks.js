// @flow
import uuid from 'uuid/v4'
import { maybe } from '@sbizeul/fp-flow'

import type { Employee, EmployeeState } from './types'


export const employees: Employee[] = [
  {
    id: uuid(),
    email_address: 'pantunez0@plala.or.jp',
    first_name: 'Paxon',
    gender: 'M',
    last_name: 'Antunez',
    phone_number: '554-169-3500'
  },
  {
    id: uuid(),
    email_address: 'ifaustian1@auda.org.au',
    first_name: 'Ignatius',
    gender: 'M',
    last_name: 'Faustian',
    phone_number: '513-933-1835'
  }
]

export const employeeState: EmployeeState = {
  all: employees,
  selectedId: maybe.of(employees[0].id),
  mode: 'create',
  errors: []
}
