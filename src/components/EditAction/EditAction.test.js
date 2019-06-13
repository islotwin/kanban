import { shallow } from 'enzyme'
import { EditAction } from './EditAction';
import React from 'react'
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

describe('<EditAction/>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<EditAction/>)
  })

  it('should have save button disabled if input too short', () => {
    expect(wrapper.find('.ok').prop('disabled')).toBe(true)
  })

  it('should have save button enabled if input is valid', () => {
    const props = { min: 1, max: 2, value: 'aa'}
    wrapper = shallow(<EditAction {...props}/>)
    // wrapper.setProps({ min: 1, max: 2, value: 'aa'})
    expect(wrapper.find('.ok').prop('disabled')).toBe(false)
  })

  it('should show buttons on focus', () => {
    wrapper.find(Input).simulate('focus')
    const buttons = wrapper.find(Button).filterWhere(b => b.props().hidden === false)
    expect(buttons).toHaveLength(2)
  })
})