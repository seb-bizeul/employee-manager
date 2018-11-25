// @flow
import uuid from 'uuid/v4'
import { maybe } from '@sbizeul/fp-flow'

import reducer, { initialState } from '../reducer'
import * as employeeActions from '../actions'
import { employees, employeeState } from '../mocks'


describe('Employee reducer', () => {

  test('populate state with employees data', () => {
    const action = employeeActions.populate(employees)
    const output = reducer(initialState, action)
    expect(output).toEqual({
      ...initialState,
      all: employees
    })
  })

  test('select employee', () => {
    const id = uuid()
    const action = employeeActions.select(id)
    const output = reducer(initialState, action)
    expect(output).toEqual({
      ...initialState,
      selectedId: maybe.just(id)
    })
  })

  test('set form mode', () => {
    const mode = 'create'
    const action = employeeActions.setMode(mode)
    const output = reducer(initialState, action)
    expect(output).toEqual({
      ...initialState,
      mode
    })
  })

  test('update employee', () => {
    const employee = { ...employees[0], last_name: 'update' }
    const action = employeeActions.update(employee)
    const output = reducer(employeeState, action)
    expect(output.all.find(e => e.id === employee.id)).toEqual(employee)
  })

  test('create employee', () => {
    const employee = {
      email_address: 'foo.com',
      last_name: 'created',
      first_name: 'user',
      gender: 'M',
      phone_number: 667987878
    }
    const action = employeeActions.create(employee)
    const output = reducer(initialState, action)
    expect(output).toEqual({
      ...initialState,
      all: [
        { ...employee, id: action.payload.id }
      ]
    })
  })

  test('remove employee', () => {
    const id = employees[0].id
    const action = employeeActions.remove(id)
    const output = reducer(employeeState, action)
    expect(output.all).toEqual(employees.filter(e => e.id !== id))
  })

  // FIXME
  test('send invitations success', () => {
    const state = {
      ...initialState,
      errors: []
    }
    const action = employeeActions.sendInvitationsSuccess()
    const output = reducer(state, action)
    expect(output).toEqual({
      ...state,
      errors: []
    })
  })

  test('validation failure', () => {
    const action = employeeActions.validationFailure(employees)
    const output = reducer(initialState, action)
    expect(output).toEqual({
      ...initialState,
      errors: employees
    })
  })

  test('reset selected id', () => {
    const state = {
      ...initialState,
      selectedId: maybe.just(uuid())
    }
    const action = employeeActions.resetSelectedId()
    const output = reducer(state, action)
    expect(output).toEqual({
      ...initialState,
      selectedId: maybe.nothing()
    })
  })

  test('remove errors', () => {
    const index = 0
    const state = {
      ...initialState,
      errors: [
        { row: index, code: '', message: '', type: '' }
      ]
    }
    const action = employeeActions.removeError(index)
    const output = reducer(state, action)
    expect(output).toEqual({
      ...initialState,
      errors: []
    })
  })

})
