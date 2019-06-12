import React from 'react'
import styled from 'styled-components'

export const Input = React.forwardRef((props, ref) => {
  const { multiline } = props
  return (
    <div>
      {multiline ? <TextArea {...props} ref={ref} /> : <StyledInput {...props} ref={ref} />}
    </div>
  )
})

const StyledInput = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  font: inherit;
  padding: 4px 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  min-width: 200px;
  display: ${props => props.hidden ? "none" : "block"};

  &:hover, &:focus, &.focus {
    border-bottom: 1px solid #aaa;
  }

`

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  border-bottom: 1px solid transparent;
  background-color: transparent;
  font: inherit;
  padding: 4px 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  min-width: 200px;
  display: ${props => props.hidden ? "none" : "block"};

  &:hover, &:focus, &.focus {
    border-bottom: 1px solid #aaa;
  }
`