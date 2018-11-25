// @flow
import type { Maybe } from '@sbizeul/fp-flow'

import type { CsvError } from '../csv/types'


export type Gender = 'M' | 'F'

export type Employee = $ReadOnly<{|
  id: string,
  first_name: string,
  last_name: string,
  gender: Gender,
  email_address: string,
  phone_number: string
|}>

export type EmployeeTuple = [ string, string, Gender, string, number ]

export type FormMode = 'create' | 'edit'

export type EmployeeState = $ReadOnly<{|
  all: Employee[],
  selectedId: Maybe<string>,
  mode: FormMode,
  errors: $ReadOnlyArray<CsvError>
|}>

export type Populate = $ReadOnly<{|
  type: 'employee/POPULATE',
  payload: Employee[]
|}>

export type PopulateErrors = $ReadOnly<{|
  type: 'employee/POPULATE_ERRORS',
  payload: CsvError[]
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

export type RemoveError = $ReadOnly<{|
  type: 'employee/REMOVE_ERROR',
  payload: number
|}>

export type EmployeeAction =
  | Populate
  | PopulateErrors
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
  | RemoveError
