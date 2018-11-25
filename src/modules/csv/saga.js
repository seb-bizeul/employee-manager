// @flow
import { put, takeEvery, call } from 'redux-saga/effects'
import Papa from 'papaparse'
import type { Saga } from 'redux-saga'

import * as csvActions from './actions'
import  { checkColumns } from './models'
import type { ParseRequest } from './types'

export const parsePromise = (csvFile: File): Promise<*> => {
  return new Promise((complete, error) => {
    return Papa.parse(csvFile, { header: true, complete, error })
  })
}

export function* parseCsv(action: ParseRequest): Saga<*> {
  const csvFile = action.payload
  try {
    const result = yield call(parsePromise, csvFile)
    if (checkColumns(result.meta.fields)) {
      yield call(window.alert, `
        Your CSV file seems to be invalid.
        Please, be sure to match the corresponding format:
        first_name, last_name, gender, email_address, phone_number
      `)
    }
    else {
      yield put(csvActions.parseSuccess(result.data))
      yield put(csvActions.parseFailure(result.errors))
    }
  }
  catch (err) {
    yield put(csvActions.parseFailure(err))
  }
}

export function* root(): Saga<*> {
  yield takeEvery(csvActions.PARSE_REQUEST, parseCsv)
}
