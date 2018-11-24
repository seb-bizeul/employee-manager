// @flow
import { fork } from 'redux-saga/effects'
import type { Saga } from 'redux-saga'

import csv from '../csv'


export default function* root(): Saga<*> {
  yield fork(csv.saga.root)
}
