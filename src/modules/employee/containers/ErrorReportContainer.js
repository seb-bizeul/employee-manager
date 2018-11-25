// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import ErrorReport from '../components/ErrorReport'
import * as employeeSelectors from '../selectors'
import * as employeeActions from '../actions'

const mapStateToProps = state => ({
  errors: employeeSelectors.getErrors(state),
  getIdByRowIndex: employeeSelectors.getIdByRowIndex(state)
})

const mapDispatchToProps = {
  removeError: employeeActions.removeError,
  select: employeeActions.select
}

export default (connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorReport): React.ComponentType<{ className?: string }>)
