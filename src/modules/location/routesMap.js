// @flow
import * as locationActions from './actions'

export const routesMap = {
  [locationActions.HOME]: '/',
  [locationActions.CSV]: '/csv',
  [locationActions.EMPLOYEE]: '/employee',
  [locationActions.EMPLOYEE_EDIT]: '/employee/:id/edit',
  [locationActions.EMPLOYEE_CREATE]: '/employee/new'
}
