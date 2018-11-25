// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import EmployeePage from '../components/EmployeePage'
import * as employeeSelectors from '../selectors'
import * as employeeActions from '../actions'
import location from '../../location'


const mapStateToProps = state => ({
  employees: employeeSelectors.getAll(state)
})

const mapDispatchToProps = {
  employeeCreate: location.actions.employeeCreate,
  select: employeeActions.select,
  sendInvitations: employeeActions.sendInvitations,
  remove: employeeActions.remove
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeePage): React.ComponentType<{}>)
