// @flow
import * as React from 'react'
import { withFormik, type FormikErrors } from 'formik'
import { maybe, pipe, type Maybe } from '@sbizeul/fp-flow'
import * as Yup from 'yup'

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
  errors: FormikErrors<FormValues>,
  resetSelectedId: typeof employeeActions.resetSelectedId,
  goToEmployeeList: typeof location.actions.employee,
  notFound: typeof location.actions.notFound
|}>

export class EmployeeForm extends React.Component<FormikProps & Props> {

  componentDidMount() {
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

  isSubmittable() {
    return !Object.keys(this.props.errors).length
  }

  render() {
    const { values, handleChange, errors } = this.props
    return (
      <div className='EmployeeForm'>
        <div className='EmployeeForm-row'>
          <label htmlFor='first_name'>First Name</label>
          <div className='EmployeeForm-row--input'>
            <input
              type='text'
              value={values.first_name}
              name='first_name'
              onChange={handleChange}
              className='EmployeeForm-inputText'
            />
            <div className='EmployeeForm-row--input---error'>{errors.first_name}</div>
          </div>
        </div>
        <div className='EmployeeForm-row'>
          <label htmlFor='last_name'>Last Name</label>
          <div className='EmployeeForm-row--input'>
            <input
              type='text'
              value={values.last_name}
              name='last_name'
              onChange={handleChange}
              className='EmployeeForm-inputText'
            />
            <div className='EmployeeForm-row--input---error'>{errors.last_name}</div>
          </div>
        </div>
        <div className='EmployeeForm-row'>
        <label htmlFor='gender'>Gender</label>
          <div className='EmployeeForm-row--input'>
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
        </div>
        <div className='EmployeeForm-row'>
          <label htmlFor='email'>Email</label>
          <div className='EmployeeForm-row--input'>
            <input
              type='email'
              value={values.email_address}
              name='email_address'
              onChange={handleChange}
              className='EmployeeForm-inputText'
            />
            <div className='EmployeeForm-row--input---error'>{errors.email_address}</div>
          </div>
        </div>
        <div className='EmployeeForm-row'>
          <label htmlFor='phone'>Phone</label>
          <div className='EmployeeForm-row--input'>
            <input
              type='phone'
              value={values.phone_number}
              name='phone_number'
              onChange={handleChange}
              className='EmployeeForm-inputText'
              />
            <div className='EmployeeForm-row--input---error'>{errors.phone_number}</div>
          </div>
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
            disabled={!this.isSubmittable()}
          >
            SUBMIT
          </button>
        </div>
      </div>
    )
  }

}

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2)
    .max(50)
    .required(),
  last_name: Yup.string()
    .min(2)
    .max(50)
    .required(),
  email_address: Yup.string()
    .email()
    .required(),
  phone_number: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, 'invalid phone number')
    .required()
})

export default (withFormik({
  validationSchema,
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
