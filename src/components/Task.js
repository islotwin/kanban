import React from 'react'
import styled from 'styled-components'

export const Task = props => {
  const { name, description } = props
  
  return (
    <StyledTask>
      <Title>{name}</Title>
      <Description>{description}</Description>
    </StyledTask>
  )
}

const StyledTask = styled.div`
  background-color: white;
`

const Title = styled.p`
`

const Description = styled.p`
`