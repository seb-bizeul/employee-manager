// @flow
import type { Maybe } from '@sbizeul/fp-flow'

import type { Map } from '../../helpers/map'

export type Gender = 'M' | 'F'

export type Employee = $ReadOnly<{|
  id: string,
  first_name: string,
  last_name: string,
  gender: Gender,
  email: string,
  phone: number
|}>

export type EmployeeTuple = [ string, string, Gender, string, number ]

export type EmployeeState = $ReadOnly<{|
  all: Map<Employee>,
  selectedId: Maybe<string>
|}>

export type Populate = $ReadOnly<{|
  type: 'employee/POPULATE',
  payload: Employee[]  
|}>

export type EmployeeAction =
  | Populate
