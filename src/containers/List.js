import React from 'react'
import styled from 'styled-components'
import { Task } from '../components/Task';
import { AddAction } from '../components/AddAction';
import { ListService } from '../services/ListService';
import { TaskService } from '../services/TaskService';

export class List extends React.Component {
  state = {
    tasks: []
  }
  componentDidMount() {
    const { dashboard, id } = this.props
    ListService.get(dashboard, id).then(({ tasks }) => {
      this.setState({ tasks })
    })
  }
  renderTasks = () => {
    return this.state.tasks.map(({ id, name, description }) => <Task key={id} name={name} description={description}/>)
  }
  addTask = name => {
    const { dashboard, id } = this.props
    TaskService.create(dashboard, id, name)
      .then(this.fetchTasks)
  }
  fetchTasks = () => {
    const { dashboard, id } = this.props
    TaskService.getAll(dashboard, id).then(tasks => this.setState({ tasks }))
  }
  render() {
    const { name } = this.props
    return (
      <StyledList>
        <Title>{name}</Title>
        {this.renderTasks()}
        <AddAction placeholder="Add a task..." onSubmit={this.addTask}/>
      </StyledList>
    )
  }
} 

const StyledList = styled.div`
  min-width: 250px;
  max-height: 600px;
  margin-right: 10px;
  background-color: rgba(0, 0, 0, 0.02);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 3px 4px 10px -5px rgba(0, 0, 0, 0.2);
`

const Title = styled.h3`
  margin-top: 0;
`