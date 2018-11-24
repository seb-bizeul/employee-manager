// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { io, maybe, pipe } from '@sbizeul/fp-flow'

import app from './modules/app'
import effects from './helpers/effects'
import './index.css'

const bootstrap = pipe(
  io.of,
  io.map(maybe.map(root => ReactDOM.render(<app.components.App />, root)))
)(effects.getElementById('root'))

io.run(bootstrap)
