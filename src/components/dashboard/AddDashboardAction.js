import React, { useState } from 'react'
import styled from 'styled-components'
import { hover } from '../../hoc/hover';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { DashboardElement } from './DashboardElement';

export const AddDashboardAction = hover(props => {
  const [isFocused, setIsFocused] = useState(false)
  const focus = () => setIsFocused(true)
  const blur = () => setIsFocused(false)
  const visible = props.isHovered || isFocused
  const [input, setInput] = useState("")
  const handleSubmit = event => {
    event.preventDefault()
    props.onSubmit(input)
    setInput("")
  }
  return (
    <StyledDashboardElement className={visible && "focused"}>
      <Form onSubmit={handleSubmit}>
        <Input 
          hidden={!visible}
          onFocus={focus}
          onBlur={blur}
          onChange={event => setInput(event.target.value)} 
          value={input} 
          placeholder="Add a dashboard..."
        />
        <SumbitButton disabled={!visible || input.length <= 0}>
          +
        </SumbitButton>
      </Form>
    </StyledDashboardElement> 
  )
})

const StyledDashboardElement = styled(DashboardElement)`
  max-width: min-content;
  margin-top: 20px;
`

const Form = styled.form`
  display: flex;
`

const SumbitButton = styled(Button)`
    background: transparent;
    margin: 0;
    padding: 0;
    border: none;
    color: #fff;
    font-size: 18px;
`