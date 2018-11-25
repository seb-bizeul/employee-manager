// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import EmployeeForm from '../components/EmployeeForm'
import * as employeeSelectors from '../selectors'
import * as employeeActions from '../actions'
import location from '../../location'
import type { FormMode } from '../types'


const mapStateToProps = state => ({
  employee: employeeSelectors.getSelected(state)
})

const mapDispatchToProps = {
  createEmployee: employeeActions.create,
  updateEmployee: employeeActions.update,
  resetSelectedId: employeeActions.resetSelectedId,
  goToEmployeeList: location.actions.employee,
  notFound: location.actions.notFound
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeForm): React.ComponentType<{ mode: FormMode }>)
