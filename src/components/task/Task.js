import React, { useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import EditIcon from '../../assets/edit.svg'
import { hover } from '../../hoc/hover';
import { EditableTask } from './EditableTask/EditableTask';
import { Image } from '../UI/Image';
import { TaskContainer, TaskHeader } from './TaskContainer';

export const HoverTask = props => {
  const { name, description, id, index, list, isHovered } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }
  const toggleIsEdited = e => {
    e && e.stopPropagation()
    setIsEdited(!isEdited)
    if(!isEdited) {
      setIsExpanded(true)
    }
  }
  if(isEdited) {
    return (
      <EditableTask 
        name={name} 
        description={description} 
        stopEdit={() => setIsEdited(false)}
        list={list}
        id={id}
      />
    )
  }
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {provided => (
        <TaskContainer 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
          onClick={toggleIsExpanded}
        >
          <TaskHeader style={{ paddingBottom: "4px" }}>
            <Title>{name}</Title>
            <HoverableImage visible={isHovered} src={EditIcon} onClick={toggleIsEdited}/>
          </TaskHeader>
          {isExpanded && <Description>{description}</Description>}
        </TaskContainer>
      )}
    </Draggable>
  )
}

const HoverableImage = styled(Image)`
  display: ${props => props.visible ? "initial" : "none"};
`

const Title = styled.p`
  margin: 0;
`

export const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 12px;
`

export const Task = hover(HoverTask)