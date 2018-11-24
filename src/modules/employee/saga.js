// @flow
import { put, takeEvery } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'

import * as employeeActions from './actions'
import { createFromTuple, isNotValid } from './models'
import csv from '../csv'
import location from '../location'
import type { Employee, Select, SendInvitations } from './types'
import type { ParseSuccess } from '../csv/types'

export function* populate(action: ParseSuccess): Saga<*> {
  const employees: Employee[] = action.payload.data
    .map(createFromTuple)
    .filter((e, idx) => idx !== 0)
  yield put(employeeActions.populate(employees))
  yield put(location.actions.employee())
}

export function* select(action: Select): Saga<*> {
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

export function* onUpdate(): Saga<*> {
  yield put(location.actions.employee())
}

export function* root(): Saga<*> {
  yield takeEvery(csv.actions.PARSE_SUCCESS, populate)
  yield takeEvery(employeeActions.SELECT, select)
  yield takeEvery(employeeActions.SEND_INVITATIONS, sendInvitations)
  yield takeEvery(employeeActions.UPDATE, onUpdate)
}
