import styled from 'styled-components'

export const Button = styled.button`
  outline: none;
  border: none;
  margin-right: 5px;
  margin-top: 10px;
  border-radius: 4px;
  padding: 6px 8px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;

  &.cancel {
    background-color: transparent;
  }

  &.ok {
    background-color: #3ED366;
    color: white;
    font-weight: 700;
  }
`