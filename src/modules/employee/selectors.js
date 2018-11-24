// @flow
import { createSelector } from 'reselect'
import { maybe } from '@sbizeul/fp-flow'

import * as map from '../../helpers/map'
import type { EmployeeState } from './types'


type AppState = {
  employee: EmployeeState
}

export const getState = (appState: AppState) => appState.employee

export const getAll = createSelector(
  getState,
  state => map.toArray(state.all)
)

export const getOne = (appState: AppState, id: string) => {
  return maybe.fromNullable(appState.employee.all[id])
}

export const getSelectedId = createSelector(
  getState,
  state => state.selectedId
)
