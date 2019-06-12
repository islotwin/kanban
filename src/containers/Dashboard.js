import React from 'react'
import styled from 'styled-components'
import { DashboardService } from '../services/DashboardService';
import { ListService } from '../services/ListService';
import { DashboardContext } from '../context/DashboardContext';
import { ListArea } from '../components/list/ListArea';
import { toArray } from '../utils/toArray';

export class Dashboard extends React.Component {
  state = {
    name: "",
    lists: {},
    color: ""
  }
  componentDidMount() {
    const { dashboard } = this.props.match.params
    this.changeDashboard(dashboard)
  }
  componentDidUpdate(prevProps) {
    const { dashboard: prevDashboard } = prevProps.match.params
    const { dashboard } = this.props.match.params
    if(prevDashboard !== dashboard) {
      this.changeDashboard(dashboard)
    }
  }
  changeDashboard = dashboardId => {
    DashboardService.get(dashboardId).then(dashboard => {
      if(dashboard) {
        const { name, lists, color } = dashboard
        this.setState({ name, lists, color })
      }
      else {
        this.props.history.replace("/")
      }
    })
  }
  addList = name => {
    const { dashboard } = this.props.match.params
    ListService.create(dashboard, name)
      .then(() => ListService.getAll(dashboard))
      .then(lists => this.setState({ lists }))
  }
  updateTasksIndices = tasks => {
    return toArray(tasks)
      .sort((a, b) => a.index - b.index)
      .reduce((acc, task, index) => {
        return Object.assign({}, acc, {
          [task.id]: {
            name: task.name,
            ...(task.description && { description: task.description }),
            index
          }
        })
      }, {})
  }
  onDragEnd = ({ sourceId, destinationId, taskId, taskIndex }) => {
    const { lists } = this.state
    const sourceList = lists[sourceId]
    const destinationList = lists[destinationId]
    const { dashboard } = this.props.match.params
    let task = sourceList.tasks[taskId]
    task = { ...task, index: taskIndex }
    const destinationTasks = {...destinationList.tasks, [taskId]: task}
    const tasks = this.updateTasksIndices(destinationTasks)

    if(destinationId === sourceId) {
      this.setState(prevState => ({
        lists: {
          ...prevState.lists,
          [destinationId]: { ...destinationList, tasks }
        }
      }))
      ListService.editTasks(dashboard, destinationId, tasks).then(() => this.fetchList(destinationId))
    }
    else {
      const sourceTasks = {...sourceList.tasks}
      delete sourceTasks[taskId]
      const updatedSourceTasks = this.updateTasksIndices(sourceTasks)
      this.setState(prevState => ({
        lists: {
          ...prevState.lists,
          [destinationId]: { ...destinationList, tasks },
          [sourceId]: { ...sourceList, tasks: updatedSourceTasks },
        }
      }))
      ListService.editTasks(dashboard, destinationId, tasks).then(() => this.fetchList(destinationId))
      ListService.editTasks(dashboard, sourceId, updatedSourceTasks).then(() => this.fetchList(sourceId))
    }
  }
  fetchList = id => {
    const { dashboard } = this.props.match.params
    ListService.get(dashboard, id)
      .then(fetchedList => {
        this.setState(prevState => {
          const lists = {...prevState.lists, [id]: fetchedList}
          return { lists }
        })
      })
  }
  render() {
    const { name, lists, color } = this.state
    const { dashboard } = this.props.match.params

    return (
      <StyledDashboard>
        <DashboardName>
          {name}
        </DashboardName>
        <DashboardContext.Provider value={{ fetchList: this.fetchList, dashboard, color }}>
          <ListArea lists={lists} addList={this.addList} onDragEnd={this.onDragEnd}/>
        </DashboardContext.Provider>
      </StyledDashboard>
    )
  }
}

const StyledDashboard = styled.div`
  margin-left: 120px;
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const DashboardName = styled.h3`
  margin-top: 0;
  text-transform: capitalize;
`