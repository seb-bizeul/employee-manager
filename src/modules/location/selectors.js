// @flow
import { createSelector } from 'reselect'

import type { LocationState } from './types'


type AppState = {
  location: LocationState
}

export const getState = (appState: AppState) => appState.location

export const getType = createSelector(
  getState,
  state => state.type
)

export const getPayload = createSelector(
  getState,
  state => state.payload
)
