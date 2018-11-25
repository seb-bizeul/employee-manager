// @flow
import uuid from 'uuid/v4'
import type { CsvError } from '../csv/types'

import type {
  Employee,
  FormMode,
  Populate,
  PopulateErrors,
  Select,
  SetMode,
  Update,
  Create,
  Remove,
  SendInvitations,
  SendInvitationsSuccess,
  Validate,
  ValidationFailure,
  ResetSelectedId,
  RemoveError
} from './types'


export const POPULATE =                 'employee/POPULATE'
export const POPULATE_ERRORS =          'employee/POPULATE_ERRORS'
export const SELECT =                   'employee/SELECT'
export const SET_MODE =                 'employee/SET_MODE'
export const UPDATE =                   'employee/UPDATE'
export const CREATE =                   'employee/CREATE'
export const REMOVE =                   'employee/REMOVE'
export const SEND_INVITATIONS =         'employee/SEND_INVITATIONS'
export const SEND_INVITATIONS_SUCCESS = 'employee/SEND_INVITATIONS_SUCCESS'
export const VALIDATE =                 'employee/VALIDATE'
export const VALIDATION_FAILURE =       'employee/VALIDATION_FAILURE'
export const RESET_SELECTED_ID =        'employee/RESET_SELECTED_ID'
export const REMOVE_ERROR =             'employee/REMOVE_ERROR'

export const populate = (employees: Employee[]): Populate => ({
  type: POPULATE,
  payload: employees
})

export const populateErrors = (errors: CsvError[]): PopulateErrors => ({
  type: POPULATE_ERRORS,
  payload: errors
})

export const select = (id: string): Select => ({
  type: SELECT,
  payload: id
})

export const setMode = (mode: FormMode): SetMode => ({
  type: SET_MODE,
  payload: mode
})

export const update = (employee: Employee): Update => ({
  type: UPDATE,
  payload: employee
})

export const create = (employee: $Diff<Employee, { id: string }>): Create => ({
  type: CREATE,
  payload: {
    ...employee,
    id: uuid()
  }
})

export const remove = (id: string): Remove => ({
  type: REMOVE,
  payload: id
})

export const sendInvitations = (employees: Employee[]): SendInvitations => ({
  type: SEND_INVITATIONS,
  payload: employees
})

export const sendInvitationsSuccess = (): SendInvitationsSuccess => ({
  type: SEND_INVITATIONS_SUCCESS
})

export const validate = (employees: Employee[]): Validate => ({
  type: VALIDATE,
  payload: employees
})

export const validationFailure = (employees: Employee[]): ValidationFailure => ({
  type: VALIDATION_FAILURE,
  payload: employees
})

export const resetSelectedId = (): ResetSelectedId => ({
  type: RESET_SELECTED_ID
})

export const removeError = (rowIndex: number): RemoveError => ({
  type: REMOVE_ERROR,
  payload: rowIndex
})
