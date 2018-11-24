// @flow
import uuid from 'uuid/v4'

import { routesMap } from './routesMap'

export const locationState = {
  pathname: '/employee',
  type: 'location/EMPLOYEE_EDIT',
  payload: { id: uuid() },
  prev: {
    pathname: '/',
    type: 'HOME',
    payload: {},
  },
  kind: 'home',
  routesMap
}
