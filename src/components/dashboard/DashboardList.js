import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DashboardService } from '../../services/DashboardService';
import { toArray } from '../../utils/toArray';
import { DashboardLink } from './DashboardLink';
import { AddDashboardAction } from './AddDashboardAction/AddDashboardAction';

export const DashboardList = props => {
  const [dashboards, setDashboards] = useState([])
  const fetchDashboards = () => {
    DashboardService.getAll()
      .then(toArray)
      .then(dashboards => dashboards.map(({ id, name, color }) => ({ id, name, color })))
      .then(setDashboards)
  }
  const addDashboard = dashboard => {
    DashboardService.create(dashboard)
    .then(({ name }) => {
      props.history.push("/" + name)
    })
    .then(fetchDashboards)
  }
  useEffect(fetchDashboards, [])
  return (
    <StyledDashboardList>
      {dashboards.map(({ id, name, color }) => <DashboardLink key={id} name={name} id={id} color={color}/>)}
      <AddDashboardAction onSubmit={addDashboard}/>
    </StyledDashboardList>
  )
}


const StyledDashboardList = styled.div`
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  z-index: 100;
  position: absolute;
`
