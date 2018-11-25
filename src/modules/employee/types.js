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

export type FormMode = 'create' | 'edit'

export type EmployeeState = $ReadOnly<{|
  all: Map<Employee>,
  selectedId: Maybe<string>,
  mode: FormMode,
  unvalid: Map<Employee>
|}>

export type Populate = $ReadOnly<{|
  type: 'employee/POPULATE',
  payload: Employee[]
|}>

export type Select = $ReadOnly<{|
  type: 'employee/SELECT',
  payload: string
|}>

export type SetMode = $ReadOnly<{|
  type: 'employee/SET_MODE',
  payload: FormMode
|}>

export type Update = $ReadOnly<{
  type: 'employee/UPDATE',
  payload: Employee
}>

export type Create = $ReadOnly<{
  type: 'employee/CREATE',
  payload: Employee
}>

export type Remove = $ReadOnly<{
  type: 'employee/REMOVE',
  payload: string
}>

export type SendInvitations = $ReadOnly<{|
  type: 'employee/SEND_INVITATIONS',
  payload: Employee[]
|}>

export type SendInvitationsSuccess = $ReadOnly<{|
  type: 'employee/SEND_INVITATIONS_SUCCESS'
|}>

export type Validate = $ReadOnly<{|
  type: 'employee/VALIDATE',
  payload: Employee[]
|}>

export type ValidationFailure = $ReadOnly<{|
  type: 'employee/VALIDATION_FAILURE',
  payload: Employee[]
|}>

export type ResetSelectedId = $ReadOnly<{|
  type: 'employee/RESET_SELECTED_ID'
|}>

export type EmployeeAction =
  | Populate
  | Select
  | SetMode
  | Update
  | Create
  | Remove
  | SendInvitations
  | SendInvitationsSuccess
  | Validate
  | ValidationFailure
  | ResetSelectedId
