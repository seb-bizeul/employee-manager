// @flow
import * as R from 'ramda'
import { maybe } from '@sbizeul/fp-flow'

import * as employeeActions from './actions'
import { toMap } from './models'
import type { EmployeeState, EmployeeAction } from './types'


export const initialState: EmployeeState = {
  all: {},
  selectedId: maybe.nothing()
}

const all = R.lensPath(['all'])

const populateState = (state, action) => R.set(all, toMap(action.payload), state)

export default function reducer(state: EmployeeState = initialState, action: EmployeeAction) {
  switch (action.type) {
  case employeeActions.POPULATE: return populateState(state, action)
  default: return state
  }
}
