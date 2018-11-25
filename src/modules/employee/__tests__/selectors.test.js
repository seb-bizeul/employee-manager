// @flow
import { maybe } from '@sbizeul/fp-flow'

import * as selectors from '../selectors'
import * as map from '../../../helpers/map'
import { employeeState, employees } from '../mocks'

describe('Employee selectors', () => {

  const appState = {
    employee: employeeState
  }

  test('getAll', () => {
    expect(selectors.getAll(appState)).toEqual(employeeState.all)
  })

  test('getOne unknown employee', () => {
    expect(selectors.getOne(appState, 'unknown')).toEqual(maybe.nothing())
  })

  test('getOne known employee', () => {
    const employee = employees[0]
    expect(selectors.getOne(appState, employee.id)).toEqual(maybe.just(employee))
  })

  test('getIdByRowIndex', () => {
    expect(selectors.getIdByRowIndex(appState, 1)).toEqual(employees[1].id)
  })

  test('getSelectedId', () => {
    expect(selectors.getSelectedId(appState)).toEqual(employeeState.selectedId)
  })

  test('getMode', () => {
    expect(selectors.getMode(appState)).toEqual(employeeState.mode)
  })

  test('getErrors', () => {
    expect(selectors.getErrors(appState)).toEqual(employeeState.errors)
  })

})
