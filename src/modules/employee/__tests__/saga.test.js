// @flow
import { put, takeEvery } from 'redux-saga/effects'
import uuid from 'uuid/v4'

import * as saga from '../saga'
import * as employeeActions from '../actions'
import { employees } from '../mocks'
import csv from '../../csv'
import location from '../../location'


describe('Employee saga', () => {

  test('populate', () => {
    const action = csv.actions.parseSuccess(employees)
    const gen = saga.populate(action)
  
    expect(gen.next().value).toEqual(
      put(employeeActions.populate(employees))
    )
    expect(gen.next(employees).value).toEqual(
      put(location.actions.employee())
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('select', () => {
    const id = uuid()
    const action = employeeActions.select(id)
    const gen = saga.select(action)
  
    expect(gen.next().value).toEqual(
      put(employeeActions.setMode('edit'))
    )
    expect(gen.next().value).toEqual(
      put(location.actions.employeeEdit(id))
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('send valid invitations', () => {
    const action = employeeActions.sendInvitations(employees)
    const gen = saga.sendInvitations(action)
  
    expect(gen.next().value).toEqual(
      put(employeeActions.sendInvitations(employees))
    )
    expect(gen.next().value).toEqual(
      put(employeeActions.sendInvitationsSuccess())
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('send invalid invitations', () => {
    const employee = { ...employees[0], email_address: 'invalid' }
    const invalid = [employee]
    const action = employeeActions.sendInvitations(invalid)
    const gen = saga.sendInvitations(action)
  
    expect(gen.next().value).toEqual(
      put(employeeActions.validationFailure(invalid))
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('root', () => {
    const gen = saga.root()
  
    expect(gen.next().value).toEqual(
      takeEvery(csv.actions.PARSE_SUCCESS, saga.populate)
    )
    expect(gen.next().value).toEqual(
      takeEvery(csv.actions.PARSE_FAILURE, saga.populateErrors)
    )
    expect(gen.next().value).toEqual(
      takeEvery(employeeActions.SELECT, saga.select)
    )
    expect(gen.next().value).toEqual(
      takeEvery(employeeActions.SEND_INVITATIONS, saga.sendInvitations)
    )
    expect(gen.next().value).toEqual(
      takeEvery(employeeActions.UPDATE, saga.goToEmployeeList)
    )
    expect(gen.next().value).toEqual(
      takeEvery(employeeActions.CREATE, saga.goToEmployeeList)
    )

    expect(gen.next().done).toBeTruthy()
  })

})
