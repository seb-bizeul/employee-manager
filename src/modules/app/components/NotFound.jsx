// @flow
import React from 'react'
import { FaBan } from 'react-icons/fa'

import './NotFound.css'


export default function NotFound() {
  return (
    <div className='NotFound'>
      <FaBan className='NotFound-icon'/>
      <span className='NotFound-text'>Resource not found</span>
    </div>
  )
}
