// @flow
import React from 'react'
import ReactTable from 'react-table'
import { FaTimes, FaEdit } from 'react-icons/fa'
import Gravatar from 'react-gravatar'
import 'react-table/react-table.css'

import * as employeeActions  from '../actions'
import type { Employee } from '../types'


type Props = $ReadOnly<{|
  employees: Employee[],
  select: typeof employeeActions.select,
  remove: typeof employeeActions.remove
|}>

export default function EmployeeTable({ employees, select, remove }: Props) {
  return (
    <ReactTable
      data={employees}
      columns={buildColumns(remove, select)}
      defaultPageSize={10}
      className='-striped -highlight'
    />
  )
}

const buildColumns = (remove, select) => [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'Avatar',
        accessor: 'email_address',
        Cell: ({ value }) => (<Gravatar email={value} size={25}/>),
        width: 80,
        style: { textAlign: 'center' }
      },
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
        accessor: 'email_address'
      },
      {
        Header: 'Phone',
        accessor: 'phone_number'
      }
    ]
  },
  {
    Header: 'Manage',
    columns: [
      {
        Header: 'Edit',
        accessor: 'id',
        Cell: ({ value }) => (<FaEdit onClick={() => select(value)}/>),
        width: 80,
        style: { textAlign: 'center', cursor: 'pointer' }
      },
      {
        Header: 'Delete',
        accessor: 'id',
        Cell: ({ value }) => (<FaTimes onClick={() => remove(value)}/>),
        width: 80,
        style: { textAlign: 'center', cursor: 'pointer' }
      }
    ]
  }
]
