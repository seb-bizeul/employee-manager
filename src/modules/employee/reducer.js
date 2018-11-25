// @flow
import * as R from 'ramda'
import { maybe } from '@sbizeul/fp-flow'

import * as employeeActions from './actions'
import type { EmployeeState, EmployeeAction } from './types'


export const initialState: EmployeeState = {
  all: [],
  selectedId: maybe.nothing(),
  mode: 'edit',
  errors: []
}

const all = R.lensPath(['all'])
const selectedId = R.lensProp('selectedId')
const mode = R.lensProp('mode')
const errors = R.lensProp('errors')

const populateEmployees = (state, action) => R.set(all, action.payload, state)

const select = (state, action) => R.set(selectedId, maybe.just(action.payload), state)

const update = (state, action) => {
  const index = R.findIndex(e => e.id === action.payload.id, state.all)
  const path = R.compose(all, R.lensIndex(index))
  return R.set(path, action.payload, state)
}

const create = (state, action) =>
  R.over(all, R.prepend(action.payload), state)

const remove = (state, action) =>
  R.over(all, R.filter(e => e.id !== action.payload), state)

const setMode = (state, action) => R.set(mode, action.payload, state)

const resetErrors = (state, action) => R.set(errors, [], state)

const populateErrors = (state, action) => R.set(errors, action.payload, state)

const resetSelectedId = (state, action) => R.over(selectedId, maybe.nothing, state)

const removeError = (state, action) => {
  const row = action.payload
  return R.pipe(
    R.set(all, state.all.filter((_, idx) => idx !== row)),
    R.set(errors, state.errors.filter((e => e.row !== row)))
  )(state)
}

export default function reducer(state: EmployeeState = initialState, action: EmployeeAction) {
  switch (action.type) {
  case employeeActions.POPULATE: return populateEmployees(state, action)
  case employeeActions.POPULATE_ERRORS: return populateErrors(state, action)
  case employeeActions.SELECT: return select(state, action)
  case employeeActions.SET_MODE: return setMode(state, action)
  case employeeActions.UPDATE: return update(state, action)
  case employeeActions.CREATE: return create(state, action)
  case employeeActions.REMOVE: return remove(state, action)
  case employeeActions.SEND_INVITATIONS_SUCCESS: return resetErrors(state, action)
  case employeeActions.VALIDATION_FAILURE: return populateErrors(state, action)
  case employeeActions.RESET_SELECTED_ID: return resetSelectedId(state, action)
  case employeeActions.REMOVE_ERROR: return removeError(state, action)
  default: return state
  }
}
