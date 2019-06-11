import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input } from './UI/Input';

export const EditAction = props => {
  const { value = "", onSubmit, className, placeholder, multiline, min = 0, max = 250 } = props
  const isInputValid = input => {
    return input.length > min && input.length <= max
  }
  const [input, setInput] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(!isInputValid(value))
  const onFocusIn = () => setIsFocused(true)
  const changeInput = input => {
    setInput(input)
    setIsButtonDisabled(!isInputValid(input))
  }
  const reset = () => {
    changeInput(value)
    setIsFocused(false)
  }
  const handleChange = event => {
    changeInput(event.target.value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit(input)
    setIsFocused(false)
    changeInput(value)
  }
  useEffect(() => {
    changeInput(value)
  }, [value])
  return (
    <StyledEditAction className={className} onSubmit={handleSubmit}>
        <Input 
          multiline={multiline}
          className={isFocused ? "header focus" : "header"}
          onFocus={onFocusIn}
          onChange={handleChange} 
          value={input} 
          placeholder={placeholder}
        />
      <SubmitButton hidden={!isFocused} disabled={isButtonDisabled}>
        +
      </SubmitButton>
      <SubmitButton hidden={!isFocused} type="reset" onClick={reset}>
        x
      </SubmitButton>
    </StyledEditAction>
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

const StyledEditAction = styled.form`
  &.title {
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 600;
  }
`