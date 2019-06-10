import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from './UI/Input';

export const AddAction = props => {
  const { placeholder, onSubmit, hidden = false, onFocusIn, onFocusOut, classes } = props
  const [input, setInput] = useState("")
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(input)
    setInput("")
  }
  return (
    <StyledAddAction className={classes} onSubmit={handleSubmit}>
        <Input 
          hidden={hidden}
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          onChange={event => setInput(event.target.value)} 
          value={input} 
          placeholder={placeholder}
        />
      <SubmitButton disabled={hidden}>
        +
      </SubmitButton>
    </StyledAddAction>
  )
}

const SubmitButton = styled.button`
  outline: none;
  border: 1px solid #ccc;
  margin-right: 5px;
  margin-top: 10px;
  border-radius: 4px;
  padding: 4px 6px;
  font-weight: 600;
`

const StyledAddAction = styled.form`
  &.dashboard {
    display: flex;

    button {
      background: transparent;
      margin: 0;
      padding: 0;
      border: none;
      color: #fff;
      font-size: 18px;
    }
  }
`