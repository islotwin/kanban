import React, { useContext } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

export const Task = props => {
  const { name, description, id, index } = props
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {provided => (
        <StyledTask {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Title>{name}</Title>
          {/* <Description>{description}</Description> */}
        </StyledTask>
      )}
    </Draggable>
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