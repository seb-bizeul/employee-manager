// @flow
import * as React from 'react'
import { withFormik } from 'formik'
import { maybe, pipe, type Maybe } from '@sbizeul/fp-flow'

import * as employeeActions from '../actions'
import location from '../../location'
import type { Gender, FormMode, Employee } from '../types'
import './EmployeeForm.css'


type FormValues = $ReadOnly<{|
  first_name: string,
  last_name: string,
  gender: Gender,
  email_address: string,
  phone_number: number  
|}>

type FormikProps = $ReadOnly<{|
  values: FormValues,
  handleChange: Event => any
|}>

type Props = $ReadOnly<{|
  updateEmployee: any,
  createEmployee: any,
  mode: FormMode,
  employee: Maybe<Employee>,
  resetSelectedId: typeof employeeActions.resetSelectedId,
  goToEmployeeList: typeof location.actions.employee,
  notFound: typeof location.actions.notFound
|}>

export class EmployeeForm extends React.Component<FormikProps & Props> {

  componentDidMount() {
    console.log(this.props.employee)
    if (maybe.isNothing(this.props.employee) && this.props.mode === 'edit') {
      this.props.notFound()
    }
  }

  componentWillUnmount() {
    this.props.resetSelectedId()
  }

  mergeEmployee = (values: FormValues) => (employee: Employee) =>
    ({ ...employee, ...values })

  handleSubmit = () => {
    const { values, employee } = this.props
    if (this.props.mode === 'create') {
      this.props.createEmployee(values)
    }
    else {
      pipe(
        maybe.map(this.mergeEmployee(values)),
        maybe.map(this.props.updateEmployee)
      )(employee)
    }
  }

  render() {
    const { values, handleChange } = this.props
    return (
      <div className='EmployeeForm'>
        <div className='EmployeeForm-row'>
          <label htmlFor='first_name'>First Name</label>
          <input
            type='text'
            value={values.first_name}
            name='first_name'
            onChange={handleChange}
            className='EmployeeForm-inputText'
          />
        </div>
        <div className='EmployeeForm-row'>
          <label htmlFor='last_name'>Last Name</label>
          <input
            type='text'
            value={values.last_name}
            name='last_name'
            onChange={handleChange}
            className='EmployeeForm-inputText'
          />
        </div>
        <div className='EmployeeForm-row'>
        <label htmlFor='gender'>Gender</label>
          <select
            name='gender'
            value={values.gender}
            onChange={handleChange}
            className='EmployeeForm-inputSelect'
          >
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
        </div>
        <div className='EmployeeForm-row'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            value={values.email_address}
            name='email_address'
            onChange={handleChange}
            className='EmployeeForm-inputText'
          />
        </div>
        <div className='EmployeeForm-row'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='phone'
            value={values.phone_number}
            name='phone_number'
            onChange={handleChange}
            className='EmployeeForm-inputText'
          />
        </div>
        <div className='EmployeeForm-submitBar'>
          <button
            onClick={this.props.goToEmployeeList}
            className='EmployeeForm-submitBar--cancel'
          >
            CANCEL
          </button>
          <button
            onClick={this.handleSubmit}
            className='EmployeeForm-submitBar--submit'
          >
            SUBMIT
          </button>
        </div>
      </div>
    )
  }

}

export default (withFormik({
  mapPropsToValues: ({ employee }) => ({
    first_name: pipe(maybe.map(e => e.first_name), maybe.getOrElse(() => ''))(employee),
    last_name: pipe(maybe.map(e => e.last_name), maybe.getOrElse(() => ''))(employee),
    gender: pipe(maybe.map(e => e.gender), maybe.getOrElse(() => 'M'))(employee),
    email_address: pipe(maybe.map(e => e.email_address), maybe.getOrElse(() => ''))(employee),
    phone_number: pipe(maybe.map(e => e.phone_number), maybe.getOrElse(() => ''))(employee)
  }),
  handleSubmit: () => {},
  enableReinitialize: true
})((EmployeeForm: any)): React.ComponentType<{}>)
