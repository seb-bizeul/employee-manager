// @flow
import reducer, { initialState } from '../reducer'
import * as employeeActions from '../actions'
import { employees } from '../mocks'

describe('Employee reducer', () => {

  test('populate state with employees data', () => {
    const action = employeeActions.populate(employees)
    const output = reducer(initialState, action)
    expect(output).toEqual({
      ...initialState,
      all: employees.reduce((acc, e) => {
        acc[e.id] = e
        return acc
      }, {})
    })
  })

})
