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

export default function CsvUpload({ parseCsv, className }: Props) {
  return (
    <Dropzone
      onDrop={handleDrop(parseCsv)}
      className={classNames('CsvUpload', className)}
    >
      {props => (
        <div className='CsvUpload-content'>
          <FaFileExcel className='CsvUpload-content--fileIcon'/>
          <span className='CsvUpload-content--text'>Click here or drop CSV file</span>
        </div>
      )}
    </Dropzone>
  )
}
