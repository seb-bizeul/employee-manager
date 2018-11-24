// @flow
import { put, takeEvery } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'

import * as employeeActions from './actions'
import { createFromTuple } from './models'
import csv from '../csv'
import location from '../location'
import type { Employee } from './types'
import type { ParseSuccess } from '../csv/types'

export function* populate(action: ParseSuccess): Saga<*> {
  const employees: Employee[] = action.payload.data
    .map(createFromTuple)
    .filter((e, idx) => idx !== 0)
  yield put(employeeActions.populate(employees))
  yield put(location.actions.employee())
}

export function* root(): Saga<*> {
  yield takeEvery(csv.actions.PARSE_SUCCESS, populate)
}
