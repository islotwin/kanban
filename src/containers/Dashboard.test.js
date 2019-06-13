import { Dashboard } from "./Dashboard";
import { shallow } from 'enzyme'
import mockAxios from 'axios'
import React from 'react'
import sinon from 'sinon'

describe("<Dashboard/>", () => {
  it('should redirect to "/" if dashboard not found', async () => {
    const history = { replace: () => {} }
    const callback = sinon.spy(history, "replace");
    mockAxios.get.mockResolvedValue(null)
    
    shallow(<Dashboard match={{ params: {} }} history={history}/>)
    await Promise.resolve()

    expect(callback.calledOnce).toBe(true)
    expect(callback.calledWith("/")).toBe(true)
  })
})