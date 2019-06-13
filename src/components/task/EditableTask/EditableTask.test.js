import sinon from 'sinon';
import { EditableTask } from './EditableTask';
import React from 'react'
import { shallow } from 'enzyme'

describe('<EditableTask/>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<EditableTask/>)
  })

  it('should stop edit on icon click', () => {
    const stopEdit = sinon.spy();

    wrapper.setProps({ stopEdit })
    wrapper.find({ src: "edit.svg" }).simulate('click')
    expect(stopEdit).toHaveProperty('callCount', 1)
  })

  it('should stop edit on cancel button click', () => {
    const stopEdit = sinon.spy();

    wrapper.setProps({ stopEdit })
    wrapper.find('.cancel').simulate('click')
    expect(stopEdit).toHaveProperty('callCount', 1)
  })
})