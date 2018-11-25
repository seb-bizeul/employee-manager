// @flow
import { createSelector } from 'reselect'
import { maybe } from '@sbizeul/fp-flow'
import * as R from 'ramda'

import type { EmployeeState } from './types'


type AppState = {
  employee: EmployeeState
}

export const getState = (appState: AppState) => appState.employee

export const getAll = createSelector(
  getState,
  state => state.all
)

export const getOne = (appState: AppState, id: string) => {
  return maybe.fromNullable(appState.employee.all.find(e => e.id === id))
}


export const getIdByRowIndex = R.curry((appState: AppState, row: number) => {
  return appState.employee.all[row].id
})

export const getSelectedId = createSelector(
  getState,
  state => state.selectedId
)

export const getSelected = createSelector(
  [getAll, getSelectedId],
  (all, id) => maybe.chain(id => maybe.fromNullable(all.find(e => e.id === id)), id)
)

export const getMode = createSelector(
  getState,
  state => state.mode
)

export const getErrors = createSelector(
  getState,
  state => state.errors
)
