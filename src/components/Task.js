import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import EditIcon from '../assets/edit.svg'
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import { TaskService } from '../services/TaskService';
import { DashboardContext } from '../context/DashboardContext';

export const Task = props => {
  const { name, description, id, index, list } = props
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
    return <EditableTask 
      name={name} 
      description={description} 
      stopEdit={() => setIsEdited(false)}
      list={list}
      id={id}
    />
  }
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {provided => (
        <StyledTask 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
          onClick={toggleIsExpanded}
        >
          <Header>
            <Title>{name}</Title>
            <Image src={EditIcon} onClick={toggleIsEdited}/>
          </Header>
          {isExpanded && <Description>{description}</Description>}
        </StyledTask>
      )}
    </Draggable>
  )
}

const EditableTask = props => {
  const { dashboard, fetchList } = useContext(DashboardContext)
  const [name, setName] = useState(props.name)
  const [description, setDescription] = useState(props.description)
  const onNameChange = e => {
    setName(e.target.value)
  }
  const onDescriptionChange = e => {
    setDescription(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    TaskService.edit(dashboard, props.list, props.id, { name, description })
      .then(() => fetchList(props.list))
      .then(props.stopEdit)
  }
  const onCancel = () => {
    props.stopEdit()
  }
  return (
    <StyledTask>
      <form onSubmit={onSubmit}>
        <Header>
          <Input onChange={onNameChange} value={name} style={inputStyle}/>
          <Image src={EditIcon} onClick={props.stopEdit}/>
        </Header>
        <Input 
          style={descriptionStyle} 
          onChange={onDescriptionChange} 
          value={description} 
          multiline
        />
        <Button>SAVE</Button>
        <Button onClick={onCancel} type="reset">CANCEL</Button>
      </form>
    </StyledTask>
  )
}

const inputStyle = {
  minWidth: "unset", 
  padding: 0
}

const descriptionStyle = {
  ...inputStyle,
  fontSize: "12px",
  fontWeight: "500",
}

const StyledTask = styled.div`
  background-color: white;
  padding: 8px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const Image = styled.img`
  width: 18px;
  height: 18px;
  margin-left: auto;
  cursor: pointer;
`

const Title = styled.p`
  margin: 0;
`

const Description = styled.p`
  font-size: 12px;
  font-weight: 500;
`