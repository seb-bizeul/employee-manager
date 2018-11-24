// @flow
import { put, takeEvery } from 'redux-saga/effects'

import * as saga from '../saga'
import * as employeeActions from '../actions'
import csv from '../../csv'


describe('Employee saga', () => {

  const userTuple = [
    'John',
    'Doe',
    'M',
    'john@gmail.com',
    5676576765
  ]

  test('populate', () => {
    const action = csv.actions.parseSuccess({ data: [userTuple] })
    const gen = saga.populate(action)
    expect(gen.next().value).toEqual(
      put(employeeActions.populate([]))
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('root', () => {
    const gen = saga.root()
    expect(gen.next().value).toEqual(
      takeEvery(csv.actions.PARSE_SUCCESS, saga.populate)
    )
    expect(gen.next().done).toBeTruthy()
  })

})
