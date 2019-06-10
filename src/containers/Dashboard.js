import React from 'react'
import { List } from './List'
import styled from 'styled-components'
import { AddAction } from '../components/AddAction'
import { DashboardService } from '../services/DashboardService';
import { ListService } from '../services/ListService';

export class Dashboard extends React.Component {
  state = {
    name: "",
    lists: [],
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
  changeDashboard = dashboard => {
    DashboardService.get(dashboard).then(({ name, lists }) => {
      this.setState({
        name,
        lists: lists || []
      })
    })
  }
  addList = name => {
    const { dashboard } = this.props.match.params
    ListService.create(dashboard, name).then(() =>
      ListService.getAll(dashboard).then(lists => this.setState({ lists }))
    )
  }
  renderLists = () => {
    const { dashboard } = this.props.match.params
    return this.state.lists.map(list => {
      return <List 
        key={list.id} 
        dashboard={dashboard}
        {...list}
      />
    })
  }
  render() {
    const { name } = this.state

    return (
      <StyledDashboard>
        <DashboardName>
          {name}
        </DashboardName>
        <Lists>
          {this.renderLists()}
          <AddAction placeholder="Add a list..." onSubmit={this.addList}/>
        </Lists>
      </StyledDashboard>
    )
  }
}

const StyledDashboard = styled.div`
  margin-left: 120px;
  height: 100%;
`

const DashboardName = styled.h3`
`

const Lists = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  height: 100%;
`
