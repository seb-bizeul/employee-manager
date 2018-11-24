// @flow
import type { Employee } from './types'

export const POPULATE = 'employee/POPULATE'

export const populate = (employees: Employee[]) => ({
  type: POPULATE,
  payload: employees
})
