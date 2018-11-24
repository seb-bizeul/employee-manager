// @flow
import { put, takeEvery, call } from 'redux-saga/effects'
import Papa from 'papaparse'
import type { Saga } from 'redux-saga'

import * as csvActions from './actions'
import type { ParseRequest } from './types'

export const parsePromise = (csvFile: File): Promise<*> => {
  return new Promise((complete, error) => {
    return Papa.parse(csvFile, { complete, error })
  })
}

export function* parseCsv(action: ParseRequest): Saga<*> {
  const csvFile = action.payload
  try {
    const result = yield call(parsePromise, csvFile)
    yield put(csvActions.parseSuccess(result))
  }
  catch (err) {
    yield put(csvActions.parseFailure(err))
  }
}

export function* root(): Saga<*> {
  yield takeEvery(csvActions.PARSE_REQUEST, parseCsv)
}
