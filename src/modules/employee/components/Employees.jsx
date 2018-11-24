// @flow
import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import * as employeeActions  from '../actions'
import type { Employee } from '../types'


type Props = $ReadOnly<{|
  employees: Employee[],
  select: typeof employeeActions.select
|}>

const model = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        accessor: 'last_name'
      }
    ]
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Gender',
        accessor: 'gender'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      }
    ]
  }
]

export default function Employees({ employees, select }: Props) {
  return (
    <ReactTable
      data={employees}
      columns={model}
      defaultPageSize={10}
      className='-striped -highlight'
      getTrProps={(state, rowInfo) => ({
        onClick: () => select(rowInfo.original.id)
      })}
    />
  )
}
