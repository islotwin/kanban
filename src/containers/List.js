import React from 'react'
import styled from 'styled-components'
import { Task } from '../components/Task';
import { ListService } from '../services/ListService';
import { TaskService } from '../services/TaskService';
import { EditAction } from '../components/EditAction';

export class List extends React.Component {
  state = {
    name: "",
    tasks: []
  }
  componentDidMount() {
    this.fetchList()
  }
  fetchList = () => {
    const { dashboard, id } = this.props
    ListService.get(dashboard, id)
      .then(({ name, tasks }) => {
        this.setState({ name, tasks })
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
    TaskService.getAll(dashboard, id)
      .then(tasks => this.setState({ tasks }))
  }
  editName = name => {
    const { dashboard, id } = this.props
    ListService.edit(dashboard, id, name)
      .then(this.fetchList)
  }
  render() {
    const { name } = this.state
    return (
      <StyledList>
        <EditAction className="title" value={name} onSubmit={this.editName} max={30}/>
        {this.renderTasks()}
        <EditAction placeholder="Add a task..." onSubmit={this.addTask}/>
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