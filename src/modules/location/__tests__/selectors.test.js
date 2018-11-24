// @flow
import * as selectors from '../selectors'
import { locationState } from '../mocks'


describe('Location selectors', () => {

  const appState = {
    location: locationState
  }

  test('getState selector', () => {
    expect(selectors.getState(appState)).toEqual(locationState)
  })

  test('getType selector', () => {
    expect(selectors.getType(appState)).toEqual(locationState.type)
  })

  test('getPayload selector', () => {
    expect(selectors.getPayload(appState)).toEqual(locationState.payload)
  })

})
