// @flow
import { put, takeEvery, call } from 'redux-saga/effects'

import * as saga from '../saga'
import { parsePromise } from '../saga'
import * as csvActions from '../actions'


describe('Csv saga', () => {

  test('parseCsv yield with invalid csv', () => {
    const file = new File([''], 'filename', { type: 'text/csv' })
    const action = csvActions.parse(file)
    const result = { data: [], errors: [], meta: { fields: [] } }
    const err = 'ERROR'
    const gen = saga.parseCsv(action)
  
    expect(gen.next().value).toEqual(
      call(parsePromise, action.payload)
    )
    expect(gen.next(result).value).toEqual(
      call(window.alert, `
        Your CSV file seems to be invalid.
        Please, be sure to match the corresponding format:
        first_name, last_name, gender, email_address, phone_number
      `)
    )

    expect(gen.throw(err).value).toEqual(
      put(csvActions.parseFailure(err))
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('parseCsv yield expected values', () => {
    const file = new File([''], 'filename', { type: 'text/csv' })
    const action = csvActions.parse(file)
    const result = {
      data: [],
      errors: [],
      meta: { fields: ['first_name','last_name','gender','email_address','phone_number'] }
    }
    const err = 'ERROR'
    const gen = saga.parseCsv(action)
  
    expect(gen.next().value).toEqual(
      call(parsePromise, action.payload)
    )
    expect(gen.next(result).value).toEqual(
      put(csvActions.parseSuccess(result.data))
    )
    expect(gen.next(result).value).toEqual(
      put(csvActions.parseFailure(result.errors))
    )

    expect(gen.throw(err).value).toEqual(
      put(csvActions.parseFailure(err))
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('root yield expected values', () => {
    const gen = saga.root()
    expect(gen.next().value).toEqual(
      takeEvery(csvActions.PARSE_REQUEST, saga.parseCsv)
    )
    expect(gen.next().done).toBeTruthy()
  })

})
