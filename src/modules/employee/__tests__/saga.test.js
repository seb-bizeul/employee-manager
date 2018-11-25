// @flow
import { put, takeEvery, select, call } from 'redux-saga/effects'
import uuid from 'uuid/v4'

import * as saga from '../saga'
import { buildFormatError } from '../models'
import * as employeeSelectors from '../selectors'
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
    const gen = saga.sendInvitations()

    expect(gen.next().value).toEqual(
      select(employeeSelectors.getAll)
    )
    expect(gen.next(employees).value).toEqual(
      put(employeeActions.sendInvitationsSuccess())
    )
    expect(gen.next(employees).value).toEqual(
      call(window.alert, `${employees.length} invitations send`)
    )
    expect(gen.next().done).toBeTruthy()
  })

  test('send invalid invitations', () => {
    const invalidEmployee = { ...employees[0], email_address: 'invalid', row: 0 }
    const invalidEmployees = [invalidEmployee]
    const gen = saga.sendInvitations()

    expect(gen.next().value).toEqual(
      select(employeeSelectors.getAll)
    )
    expect(gen.next(invalidEmployees).value).toEqual(
      // $FlowFixMe
      put(employeeActions.validationFailure(invalidEmployees.map(buildFormatError)))
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
    expect(gen.next().value).toEqual(
      takeEvery(employeeActions.REMOVE_ERROR, saga.validate)
    )
    expect(gen.next().value).toEqual(
      takeEvery(employeeActions.UPDATE, saga.validate)
    )
    expect(gen.next().done).toBeTruthy()
  })

})
