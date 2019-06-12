import React, { useState, useContext } from 'react'
import EditIcon from '../../assets/edit.svg'
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { TaskService } from '../../services/TaskService';
import { DashboardContext } from '../../context/DashboardContext';
import { Image } from '../UI/Image';
import { TaskContainer, TaskHeader } from './TaskContainer';

export const EditableTask = props => {
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
    <TaskContainer>
      <form onSubmit={onSubmit}>
        <TaskHeader>
          <Input onChange={onNameChange} value={name} style={inputStyle}/>
          <Image src={EditIcon} onClick={props.stopEdit}/>
        </TaskHeader>
        <Input 
          style={descriptionStyle} 
          onChange={onDescriptionChange} 
          value={description} 
          multiline
        />
        <Button>SAVE</Button>
        <Button onClick={onCancel} type="reset">CANCEL</Button>
      </form>
    </TaskContainer>
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