import React from 'react'
import { mount } from 'enzyme'
import { AddDashboardAction } from './AddDashboardAction';
import { Input } from '../../UI/Input';

describe('<AddDashboardAction/>', () => {
  it('should show input on mouse over', () => {
    const wrapper = mount(<AddDashboardAction/>)
    wrapper.simulate('mouseenter')

    expect(wrapper.find(Input).filterWhere(i => i.props().hidden === false)).toHaveLength(1)
  })
})