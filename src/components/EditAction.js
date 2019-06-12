import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Input } from './UI/Input';
import { Button } from './UI/Button';

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
  useEffect(() => {
    const node = inputRef.current
    if (node) {
      if (isFocused) {
        node.focus()
      }
      else {
        node.blur()
      }
    }
  }, [isFocused])
  const inputRef = useRef(null)

  return (
    <StyledEditAction className={className} onSubmit={handleSubmit}>
        <Input 
          multiline={multiline}
          className={isFocused ? "header focus" : "header"}
          onFocus={onFocusIn}
          onChange={handleChange} 
          value={input} 
          placeholder={placeholder}
          ref={inputRef}
        />
      <Button className="ok" hidden={!isFocused} disabled={isButtonDisabled}>
        save
      </Button>
      <Button className="cancel" hidden={!isFocused} type="reset" onClick={reset}>
        cancel
      </Button>
    </StyledEditAction>
  )
}

const StyledEditAction = styled.form`
  &.title {
    margin-top: 0;
    margin-bottom: 16px;
    font-weight: 600;
  }
`