// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Routing from '../components/Routing'
import location from '../../location'


const mapStateToProps = state => ({
  actionType: location.selectors.getType(state)
})

export default (
  connect(mapStateToProps)(Routing): React.ComponentType<{}>
)
