// @flow
import React from 'react'
import { FaEdit, FaTimes, FaSmile } from 'react-icons/fa'

import * as employeeActions from '../actions'
import type { CsvError } from '../../csv/types'
import './ErrorReport.css'


type Props = $ReadOnly<{|
  errors: CsvError[],
  getIdByRowIndex: number => string,
  removeError: typeof employeeActions.removeError,
  select: typeof employeeActions.select
|}>

export default function ErrorReport(props: Props) {

  const renderError = (error: CsvError) => {
    const id = props.getIdByRowIndex(error.row)
    return (
      <div
        className='CsvErrorReport-error'
        key={error.row + error.message}
      >
        <span>Row {error.row}:&nbsp;{error.message}</span>
        <div>
          <FaEdit
            className='CsvErrorReport-error--edit'
            onClick={() => props.select(id)}
          />
          <FaTimes
            className='CsvErrorReport-error--delete'
            onClick={() => props.removeError(error.row)}
          />
        </div>
      </div>
    )
  }

  const renderNoErrors = () => {
    return (
      <div className='CsvErrorReport-noErrors'>
        <FaSmile className='CsvErrorReport-noErrors--smile'/>
        <span>No errors detected!</span>
      </div>
    )
  }

  return (
    <div className='CsvErrorReport'>
      {!props.errors.length ? renderNoErrors() : null}
      {props.errors.map(renderError)}
    </div>
  )
}
