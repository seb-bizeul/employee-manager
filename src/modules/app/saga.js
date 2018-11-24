// @flow
import { fork } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'

import csv from '../csv'
import employee from '../employee'


export default function* root(): Saga<*> {
  yield fork(csv.saga.root)
  yield fork(employee.saga.root)
}
