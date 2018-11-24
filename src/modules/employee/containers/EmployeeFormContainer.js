// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import EmployeeForm from '../components/EmployeeForm'
import * as employeeSelectors from '../selectors'
import * as employeeActions from '../actions'
import location from '../../location'


const mapStateToProps = state => ({
  employee: employeeSelectors.getSelected(state),
  mode: employeeSelectors.getMode(state)
})

const mapDispatchToProps = {
  goToEmployeeList: location.actions.employee,
  createEmployee: () => {},
  updateEmployee: employeeActions.update
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeForm): React.ComponentType<{}>)
