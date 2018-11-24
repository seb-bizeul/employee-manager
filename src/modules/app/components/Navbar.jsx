// @flow
import React from 'react'
import Link from 'redux-first-router-link'

import location from '../../location'
import './Navbar.css'


type Props = $ReadOnly<{|
  
|}>

export default function Navbar(props: Props) {
  return (
    <nav className='Navbar'>
      <span className='Navbar-brand'>Employee Manager</span>
      <div className='Navbar-section'>
        <Link
          to={location.actions.csv()}
          className='Navbar-section--item link'
        >
          csv
        </Link>
        <Link
          to={location.actions.employee()}
          className='Navbar-section--item link'
        >
          employee
        </Link>
      </div>
    </nav>
  )
}
