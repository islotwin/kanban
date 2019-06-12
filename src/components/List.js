import React from 'react'
import styled from 'styled-components'
import { Task } from './Task';
import { ListService } from '../services/ListService';
import { TaskService } from '../services/TaskService';
import { EditAction } from './EditAction';
import { Droppable } from 'react-beautiful-dnd'
import { toArray } from '../utils/toArray';
import { DashboardContext } from '../context/DashboardContext';

export class List extends React.Component {
  static contextType = DashboardContext
  constructor(props) {
    super(props)
    console.log(props.name, 'constructor')
  }
  fetchList = () => {
    this.context.fetchList(this.props.id)
  }
  shouldComponentUpdate(nextProps) {
    const { name, tasks } = this.props
    console.log('shouldupdate')
    console.log(name, name !== nextProps.name || tasks !== nextProps.tasks)
    return name !== nextProps.name || tasks !== nextProps.tasks
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.name, 'didupdate')
  }
  addTask = name => {
    const { id } = this.props
    const { dashboard } = this.context
    console.log(id, dashboard)
    const index = Object.keys(this.props.tasks || {}).length
    TaskService.create(dashboard, id, { name, index })
      .then(this.fetchList)
  }
  editName = name => {
    const { id } = this.props
    const { dashboard } = this.context
    console.log(dashboard, id, name)
    ListService.editName(dashboard, id, name)
    .then(this.fetchList)
  }
  renderTaskArea = provided => {
    return (
      <TaskArea ref={provided.innerRef} {...provided.droppableProps}>
        {this.renderTasks()}
        {provided.placeholder}
      </TaskArea>
    )
  }
  renderTasks = () => {
    const { tasks } = this.props
    return toArray(tasks)
      .sort((a, b) => a.index - b.index)
      .map(task => <Task key={task.id} {...task}/>)
  }
  render() {
    const { name, id } = this.props
    console.log(name)
    return (
      <StyledList>
        <EditAction className="title" value={name} onSubmit={this.editName} max={30}/>
        <Droppable droppableId={id}>
          {provided => this.renderTaskArea(provided)}
        </Droppable>
        <EditAction placeholder="Add a task..." onSubmit={this.addTask}/>
      </StyledList>
    )
  }
} 

const TaskArea = styled.div`
`

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