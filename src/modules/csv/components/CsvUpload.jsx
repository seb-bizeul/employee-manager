// @flow
import React from 'react'
import Dropzone from 'react-dropzone'
import { FaFileExcel } from 'react-icons/fa'
import classNames from 'classnames'

import * as csvActions from '../actions'
import './CsvUpload.css'


type Props = $ReadOnly<{|
  parseCsv: typeof csvActions.parse,
  className?: string
|}>

const handleDrop = parseCsv => files => {
  parseCsv(files[0])
}

export default function DropCsv({ parseCsv, className }: Props) {
  return (
    <Dropzone
      onDrop={handleDrop(parseCsv)}
      className={classNames('DropCsv', className)}
    >
      {props => (
        <div className='DropCsv-content'>
          <FaFileExcel className='DropCsv-content--fileIcon'/>
          <span>Click here or Drop a CSV file</span>
        </div>
      )}
    </Dropzone>
  )
}
