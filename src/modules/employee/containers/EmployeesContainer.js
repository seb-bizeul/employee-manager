// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Employees from '../components/Employees'
import * as employeeSelectors from '../selectors'

const mapStateToProps = state => ({
  employees: employeeSelectors.getAll(state)
})

export default (connect(
  mapStateToProps
)(Employees): React.ComponentType<{}>)
