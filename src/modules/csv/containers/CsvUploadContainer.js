// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import CsvUpload from '../components/CsvUpload'
import * as csvActions from '../actions' 

const mapDispatchToProps = {
  parseCsv: csvActions.parse
}

export default (connect(
  null,
  mapDispatchToProps
)(CsvUpload): React.ComponentType<{ className?: string }>)
