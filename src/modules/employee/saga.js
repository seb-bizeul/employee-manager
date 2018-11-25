// @flow
import { put, takeEvery } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'

import * as employeeActions from './actions'
import { createEmployee, isNotValid } from './models'
import csv from '../csv'
import location from '../location'
import type { Employee, Select, SendInvitations } from './types'
import type { ParseSuccess, ParseFailure } from '../csv/types'

export function* populate(action: ParseSuccess): Saga<*> {
  const employees: Employee[] = action.payload.map(createEmployee)
  yield put(employeeActions.populate(employees))
  yield put(location.actions.employee())
}

export function* populateErrors(action: ParseFailure): Saga<*> {
  yield put(employeeActions.populateErrors(action.payload))
}

export function* select(action: Select): Saga<*> {
  yield put(employeeActions.setMode('edit'))
  yield put(location.actions.employeeEdit(action.payload))
}

export function* sendInvitations(action: SendInvitations): Saga<*> {
  const employees = action.payload
  const unvalidEmployees = employees.filter(isNotValid)
  if (unvalidEmployees.length) {
    yield put(employeeActions.validationFailure(unvalidEmployees))
  }
  else {
    yield put(employeeActions.sendInvitations(employees))
    yield put(employeeActions.sendInvitationsSuccess())
  }
}

export function* goToEmployeeList(): Saga<*> {
  yield put(location.actions.employee())
}

export function* root(): Saga<*> {
  yield takeEvery(csv.actions.PARSE_SUCCESS, populate)
  yield takeEvery(csv.actions.PARSE_FAILURE, populateErrors)
  yield takeEvery(employeeActions.SELECT, select)
  yield takeEvery(employeeActions.SEND_INVITATIONS, sendInvitations)
  yield takeEvery(employeeActions.UPDATE, goToEmployeeList)
  yield takeEvery(employeeActions.CREATE, goToEmployeeList)
}
