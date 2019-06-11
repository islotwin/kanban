import React from 'react'
import styled from 'styled-components'

export const Task = props => {
  const { name, description } = props
  
  return (
    <StyledTask>
      <Title>{name}</Title>
      {/* <Description>{description}</Description> */}
    </StyledTask>
  )
}

const StyledTask = styled.div`
  background-color: white;
  padding: 8px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
`

const Title = styled.p`
  margin: 0;
`

const Description = styled.p`
`