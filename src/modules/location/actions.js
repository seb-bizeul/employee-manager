// @flow
import { NOT_FOUND } from 'redux-first-router'

export const HOME =             'location/HOME'
export const CSV =              'location/CSV'
export const EMPLOYEE =         'location/EMPLOYEE'
export const EMPLOYEE_EDIT =    'location/EMPLOYEE_EDIT'
export const EMPLOYEE_CREATE =  'location/EMPLOYEE_CREATE'

export const home = () => ({ type: HOME })

export const notFound = () => ({ type: NOT_FOUND })

export const csv = () => ({ type: CSV })

export const employee = () => ({ type: EMPLOYEE })

export const employeeCreate = () => ({ type: EMPLOYEE_CREATE })

export const employeeEdit = (id: string) => ({
  type: EMPLOYEE_EDIT,
  payload: { id }
})
