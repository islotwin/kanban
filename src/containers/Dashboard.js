import React from 'react'
import styled from 'styled-components'
import { DashboardService } from '../services/DashboardService';
import { ListService } from '../services/ListService';
import { DashboardContext } from '../context/DashboardContext';
import { ListArea } from '../components/ListArea';
import { toArray } from '../utils/toArray';

export class Dashboard extends React.Component {
  state = {
    name: "",
    lists: {},
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
        const { name, lists } = dashboard
        this.setState({ name, lists })
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
  onDragEnd = ({ draggableId, source, destination }) => {
    if(!destination) {
      return
    }
    const { droppableId: sourceId } = source
    const { droppableId: destinationId } = destination
    const { lists } = this.state
    const sourceList = lists[sourceId]
    const destinationList = lists[destinationId]
    const task = {...sourceList.tasks[draggableId]}
    if(!task) {
      return
    }
    const { dashboard } = this.props.match.params
    const goneUp = destination.index > source.index
    const changedList = destinationId !== sourceId
    const indexDelta = goneUp && !changedList ? 0.5 : -0.5
    task.index = destination.index + indexDelta
    const destinationTasks = {...destinationList.tasks, [draggableId]: task}
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
      delete sourceTasks[draggableId]
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
    const { name, lists } = this.state
    const { dashboard } = this.props.match.params

    return (
      <StyledDashboard>
        <DashboardName>
          {name}
        </DashboardName>
        <DashboardContext.Provider value={{ fetchList: this.fetchList, dashboard }}>
          <ListArea lists={lists} addList={this.addList} onDragEnd={this.onDragEnd}/>
        </DashboardContext.Provider>
      </StyledDashboard>
    )
  }
}

const StyledDashboard = styled.div`
  margin-left: 120px;
  height: 100%;
`

const DashboardName = styled.h3`
  text-transform: capitalize;
`