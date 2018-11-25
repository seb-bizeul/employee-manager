// @flow
import * as R from 'ramda'
import { maybe } from '@sbizeul/fp-flow'

import * as employeeActions from './actions'
import { toMap } from './models'
import type { EmployeeState, EmployeeAction } from './types'


export const initialState: EmployeeState = {
  all: {},
  selectedId: maybe.nothing(),
  mode: 'edit',
  unvalid: {}
}

const all = R.lensPath(['all'])
const selectedId = R.lensProp('selectedId')
const mode = R.lensProp('mode')
const unvalid = R.lensProp('unvalid')

const populateState = (state, action) => R.set(all, toMap(action.payload), state)

const select = (state, action) => R.set(selectedId, maybe.just(action.payload), state)

const update = (state, action) => {
  const path = R.compose(all, R.lensPath([action.payload.id]))
  return R.set(path, action.payload, state)
}

const remove = (state, action) => {
  return R.over(all, R.omit([action.payload]), state)
}

const setMode = (state, action) => R.set(mode, action.payload, state)

const resetUnvalid = (state, action) => R.set(unvalid, {}, state)

const setUnvalid = (state, action) => R.set(unvalid, toMap(action.payload), state)

const resetSelectedId = (state, action) => R.over(selectedId, maybe.nothing, state)

export default function reducer(state: EmployeeState = initialState, action: EmployeeAction) {
  switch (action.type) {
  case employeeActions.POPULATE: return populateState(state, action)
  case employeeActions.SELECT: return select(state, action)
  case employeeActions.SET_MODE: return setMode(state, action)
  case employeeActions.UPDATE: return update(state, action)
  case employeeActions.CREATE: return update(state, action)
  case employeeActions.REMOVE: return remove(state, action)
  case employeeActions.SEND_INVITATIONS_SUCCESS: return resetUnvalid(state, action)
  case employeeActions.VALIDATION_FAILURE: return setUnvalid(state, action)
  case employeeActions.RESET_SELECTED_ID: return resetSelectedId(state, action)
  default: return state
  }
}
