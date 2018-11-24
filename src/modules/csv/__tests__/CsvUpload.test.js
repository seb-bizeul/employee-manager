// @flow
import React from 'react'
import { mount } from 'enzyme'

import CsvUpload from '../components/CsvUpload'
import * as csvActions from '../actions'


describe('CsvUpload component', () => {

  const props = {
    parseCsv: csvActions.parse
  }

  test('triggers parseCsv on drop', () => {
    const parseCsv = jest.spyOn(props, 'parseCsv')
    const mockedFiles = [1, 2, 3]
    const wrapper = mount(<CsvUpload parseCsv={parseCsv}/>)
    wrapper.simulate('drop', mockedFiles)
    setTimeout(() => {
      expect(parseCsv).toHaveBeenCalledTimes(1)
      expect(parseCsv).toHaveBeenCalledWith(mockedFiles[0])
      wrapper.unmount()
    })
  })

})
