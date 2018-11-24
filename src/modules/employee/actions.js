// @flow
import type {
  Employee,
  FormMode,
  Populate,
  Select,
  SetMode,
  Update,
  SendInvitations,
  SendInvitationsSuccess,
  Validate,
  ValidationFailure
} from './types'


export const POPULATE =                 'employee/POPULATE'
export const SELECT =                   'employee/SELECT'
export const SET_MODE =                 'employee/SET_MODE'
export const UPDATE =                   'employee/UPDATE'
export const SEND_INVITATIONS =         'employee/SEND_INVITATIONS'
export const SEND_INVITATIONS_SUCCESS = 'employee/SEND_INVITATIONS_SUCCESS'
export const VALIDATE =                 'employee/VALIDATE'
export const VALIDATION_FAILURE =       'employee/VALIDATION_FAILURE'

export const populate = (employees: Employee[]): Populate => ({
  type: POPULATE,
  payload: employees
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
