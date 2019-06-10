import React from 'react'
import styled from 'styled-components'

export const Input = props => {
  return (
    <div>
      <StyledInput {...props}/>
    </div>
  )
}

const StyledInput = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 4px 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  display: ${props => props.hidden ? "none" : "block"};
`