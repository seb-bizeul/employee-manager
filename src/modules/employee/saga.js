// @flow
import { put, takeEvery, call, select as selectFromState} from 'redux-saga/effects'
import type { Saga } from 'redux-saga'
import * as R from 'ramda'

import * as employeeActions from './actions'
import * as employeeSelectors from './selectors'
import {
  createEmployee,
  isNotValid,
  buildFormatError,
  isEmailDuplicated,
  buildEmailDuplicationError
} from './models'
import csv from '../csv'
import location from '../location'
import type { Employee, Select } from './types'
import type { ParseSuccess, ParseFailure } from '../csv/types'

const getInvalidMailsAndPhones = employees => {
  return employees
  .map((e, idx) => ({ ...e, row: idx }))
  .filter(isNotValid)
  .map(buildFormatError)
}

const getDuplicatedEmails = employees => {
  return employees
    .map((e, idx) => ({ ...e, row: idx }))
    .filter(isEmailDuplicated(employees))
    .filter(R.uniqBy(e => e.row))
    .map(buildEmailDuplicationError)
}

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

export function* validate(): Generator<*, *, *> {
  const employees = yield selectFromState(employeeSelectors.getAll)
  const unvalidEmployees = [
    ...getInvalidMailsAndPhones(employees),
    ...getDuplicatedEmails(employees)
  ]
  if (unvalidEmployees.length) {
    yield put(employeeActions.validationFailure(unvalidEmployees))
  }
}

export function* sendInvitations(): Saga<*> {
  const employees = yield selectFromState(employeeSelectors.getAll)
  const unvalidEmployees = [
    ...getInvalidMailsAndPhones(employees),
    ...getDuplicatedEmails(employees)
  ]
  if (unvalidEmployees.length) {
    yield put(employeeActions.validationFailure(unvalidEmployees))
  }
  else {
    yield put(employeeActions.sendInvitationsSuccess())
    yield call(window.alert, `${employees.length} invitations send`)
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
  yield takeEvery(employeeActions.REMOVE_ERROR, validate)
  yield takeEvery(employeeActions.UPDATE, validate)
}
