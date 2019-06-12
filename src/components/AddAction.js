import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from './UI/Input';
import { Button } from './UI/Button'

export const AddAction = props => {
  const { placeholder, onSubmit, hidden = false, onFocusIn, onFocusOut, className } = props
  const [input, setInput] = useState("")
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(input)
    setInput("")
  }
  return (
    <StyledAddAction className={className} onSubmit={handleSubmit}>
        <Input 
          hidden={hidden}
          onFocus={onFocusIn}
          onBlur={onFocusOut}
          onChange={event => setInput(event.target.value)} 
          value={input} 
          placeholder={placeholder}
        />
      <Button disabled={hidden}>
        +
      </Button>
    </StyledAddAction>
  )
}

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