// @flow
import uuid from 'uuid/v4'
import { maybe } from '@sbizeul/fp-flow'

import type { Employee, EmployeeState } from './types'
import { toMap } from './models'


export const employees: Employee[] = [
  {
    id: uuid(),
    email: 'pantunez0@plala.or.jp',
    first_name: 'Paxon',
    gender: 'M',
    last_name: 'Antunez',
    phone: 5541693500
  },
  {
    id: uuid(),
    email: 'ifaustian1@auda.org.au',
    first_name: 'Ignatius',
    gender: 'M',
    last_name: 'Faustian',
    phone: 5139331835
  }
]

export const employeeState: EmployeeState = {
  all: toMap(employees),
  selectedId: maybe.of(employees[0].id)
}
